/**
 * Integration tests for comment support
 */

import { describe, it, expect } from 'vitest';
import { parseIris, compile } from '../../src/index.js';

describe('comments', () => {
  it('should ignore single-line comments', () => {
    const code = `
      // This is a comment
      V(g4){
        S(h4)
      }
    `;
    
    const ast = parseIris(code);
    expect(ast.type).toBe('VStack');
  });

  it('should ignore multi-line comments', () => {
    const code = `
      /* This is a
         multi-line comment */
      V(g4){
        S(h4)
      }
    `;
    
    const ast = parseIris(code);
    expect(ast.type).toBe('VStack');
  });

  it('should ignore comments at end of line', () => {
    const code = `
      V(g4){ // Comment here
        S(h4) // Another comment
      }
    `;
    
    const ast = parseIris(code);
    expect(ast.type).toBe('VStack');
  });

  it('should ignore comments between nodes', () => {
    const code = `
      V(g4){
        // Comment between nodes
        S(h4)
        /* Another comment */
        S(h3)
      }
    `;
    
    const ast = parseIris(code);
    expect(ast.type).toBe('VStack');
    if (ast.type === 'VStack') {
      expect(ast.children.length).toBe(2);
    }
  });

  it('should handle nested comments', () => {
    const code = `
      V(g4){
        /* Outer comment
           End of outer */
        S(h4)
      }
    `;
    
    const ast = parseIris(code);
    expect(ast.type).toBe('VStack');
  });

  it('should compile code with comments', () => {
    const code = `
      // Header section
      V(g4){
        S(h4) // Title
        S(h3) // Subtitle
      }
    `;
    
    const jsx = compile(code);
    expect(jsx).toContain('<div');
    expect(jsx).toContain('Skeleton');
  });

  it('should handle comments in parameters', () => {
    const code = `
      V(/* gap */ g4 /* end */){
        S(h4)
      }
    `;
    
    const ast = parseIris(code);
    expect(ast.type).toBe('VStack');
  });
});

