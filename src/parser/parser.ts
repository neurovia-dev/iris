/**
 * IRIS Parser
 * 
 * Converts textual IRIS DSL to canonical AST.
 */

import { parse as pegParse } from './grammar.js';
import { readFileSync } from 'fs';
import type { Node } from '../ast/types.js';

/**
 * Parses IRIS code and returns the AST
 */
export function parse(irisCode: string): Node {
  try {
    const result = pegParse(irisCode.trim(), {});
    
    // If result has type 'Program', return first child or create VStack wrapper
    if (result && typeof result === 'object' && 'type' in result && result.type === 'Program') {
      if ('children' in result && Array.isArray(result.children)) {
        if (result.children.length === 1) {
          return result.children[0];
        }
        // Multiple nodes at top level - wrap in VStack
        return {
          type: 'VStack',
          children: result.children || [],
        };
      }
    }
    
    return result as Node;
  } catch (error: any) {
    // Extract location information from peggy error
    const location = error.location;
    if (location) {
      const { start, end } = location;
      const lines = irisCode.split('\n');
      const line = lines[start.line - 1] || '';
      const pointer = ' '.repeat(start.column - 1) + '^'.repeat(Math.max(1, end.column - start.column));
      
      throw new Error(
        `Parse error at line ${start.line}, column ${start.column}:\n` +
        `  ${line}\n` +
        `  ${pointer}\n` +
        `  ${error.message}`
      );
    }
    
    throw new Error(`Parse error: ${error.message}`);
  }
}

/**
 * Parses a .iris file
 */
export function parseFile(filePath: string): Node {
  const content = readFileSync(filePath, 'utf-8');
  return parse(content);
}

