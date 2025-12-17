/**
 * React Codegen
 * 
 * Converts AST to JSX/TSX with Tailwind CSS.
 */

import type { Node, VStack, HStack, Skeleton, Repeat, Program } from '../ast/types.js';
import { stackToTailwind, skeletonToTailwind, combineClasses, deduplicateClasses } from './tailwind.js';
import { formatJSXWithOptions, type FormatOptions } from './formatter.js';

/**
 * Compilation options
 */
export interface CompileOptions extends FormatOptions {
  useFragment?: boolean; // Use Fragment when multiple nodes at top level
}

/**
 * Generates JSX from an AST node or Program
 */
export function compileToReact(node: Node | Program, options: CompileOptions = {}): string {
  const { pretty = true, useFragment = true, ...formatOptions } = options;
  
  // If Program with multiple children, use Fragment if enabled
  if (node.type === 'Program' && node.children.length > 1 && useFragment) {
    const childrenJsx = node.children
      .map(child => compileNode(child, 0))
      .join('\n');
    const jsx = `<React.Fragment>\n${childrenJsx}\n</React.Fragment>`;
    return formatJSXWithOptions(jsx, { pretty, ...formatOptions });
  }
  
  // If Program with one child, compile only the child
  if (node.type === 'Program' && node.children.length === 1) {
    return compileToReact(node.children[0], options);
  }
  
  // Compile normal node
  const jsx = compileNode(node as Node, 0);
  return formatJSXWithOptions(jsx, { pretty, ...formatOptions });
}

/**
 * Compiles an individual node
 */
function compileNode(node: Node, indent: number): string {
  switch (node.type) {
    case 'VStack':
      return compileVStack(node, indent);
    
    case 'HStack':
      return compileHStack(node, indent);
    
    case 'Skeleton':
      return compileSkeleton(node, indent);
    
    case 'Repeat':
      return compileRepeat(node, indent);
    
    default:
      throw new Error(`Unknown node type: ${(node as any).type}`);
  }
}

function compileVStack(node: VStack, indent: number): string {
  const indentStr = '  '.repeat(indent);
  const classes = deduplicateClasses(['flex', 'flex-col', ...stackToTailwind(node)]);
  const className = combineClasses(classes);
  
  if (node.children.length === 0) {
    return `${indentStr}<div className="${className}" />`;
  }
  
  const children = node.children
    .map(child => compileNode(child, indent + 1))
    .join('\n');
  
  return `${indentStr}<div className="${className}">\n${children}\n${indentStr}</div>`;
}

function compileHStack(node: HStack, indent: number): string {
  const indentStr = '  '.repeat(indent);
  const classes = deduplicateClasses(['flex', ...stackToTailwind(node)]);
  const className = combineClasses(classes);
  
  if (node.children.length === 0) {
    return `${indentStr}<div className="${className}" />`;
  }
  
  const children = node.children
    .map(child => compileNode(child, indent + 1))
    .join('\n');
  
  return `${indentStr}<div className="${className}">\n${children}\n${indentStr}</div>`;
}

function compileSkeleton(node: Skeleton, indent: number): string {
  const indentStr = '  '.repeat(indent);
  const classes = deduplicateClasses(skeletonToTailwind(node));
  const className = combineClasses(classes);
  
  if (className) {
    return `${indentStr}<Skeleton className="${className}" />`;
  }
  
  return `${indentStr}<Skeleton />`;
}

function compileRepeat(node: Repeat, indent: number): string {
  const childJsx = compileNode(node.child, indent + 1);
  const childLines = childJsx.split('\n');
  
  // If child is single line, repeat inline
  if (childLines.length === 1) {
    return Array(node.count)
      .fill(childLines[0])
      .join('\n');
  }
  
  // If child is multi-line, repeat the complete block
  return Array(node.count)
    .fill(null)
    .map(() => childJsx)
    .join('\n');
}

