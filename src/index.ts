/**
 * IRIS Public API
 * 
 * Public API for parsing and compiling IRIS code.
 */

import { parse, parseFile } from './parser/parser.js';
import { compileToReact, type CompileOptions } from './codegen/react.js';
import type { Node, Program } from './ast/types.js';

/**
 * Parses IRIS code and returns the AST
 */
export function parseIris(irisCode: string): Node {
  return parse(irisCode);
}

/**
 * Compiles IRIS code to JSX/TSX
 */
export function compile(irisCode: string, options?: CompileOptions): string {
  const ast = parse(irisCode);
  return compileToReact(ast, options);
}

/**
 * Compiles AST to JSX/TSX
 */
export function compileToReactFromAST(ast: Node | Program, options?: CompileOptions): string {
  return compileToReact(ast, options);
}

/**
 * Parses a .iris file and returns the AST
 */
export function parseIrisFile(filePath: string): Node {
  return parseFile(filePath);
}

/**
 * Compiles a .iris file to JSX/TSX
 */
export function compileFile(filePath: string): string {
  const ast = parseFile(filePath);
  return compileToReact(ast);
}

// Re-export types
export type { Node, VStack, HStack, Skeleton, Repeat } from './ast/types.js';

