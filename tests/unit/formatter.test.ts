/**
 * Tests for JSX Formatter
 */

import { describe, it, expect } from 'vitest';
import { formatJSX, minifyJSX, removeDuplicateClasses, formatJSXWithOptions } from '../../src/codegen/formatter.js';

describe('formatter', () => {
  describe('removeDuplicateClasses', () => {
    it('should remove duplicate classes', () => {
      const input = 'flex flex-col gap-4 gap-4 mb-6';
      const result = removeDuplicateClasses(input);
      expect(result).toBe('flex flex-col gap-4 mb-6');
    });

    it('should preserve order of first occurrence', () => {
      const input = 'gap-4 flex gap-4 mb-6 flex';
      const result = removeDuplicateClasses(input);
      expect(result).toBe('gap-4 flex mb-6');
    });

    it('should handle empty string', () => {
      const result = removeDuplicateClasses('');
      expect(result).toBe('');
    });

    it('should handle single class', () => {
      const result = removeDuplicateClasses('flex');
      expect(result).toBe('flex');
    });
  });

  describe('formatJSX', () => {
    it('should format JSX with proper indentation', () => {
      const input = '<div className="flex">\n<div className="flex-col">\n<Skeleton />\n</div>\n</div>';
      const result = formatJSX(input, 2);
      // Primeira div deve ter 0 espaços (raiz)
      expect(result).toMatch(/^<div className="flex">/m);
      // Segunda div deve ter 2 espaços (dentro da primeira)
      expect(result).toMatch(/^  <div className="flex-col">/m);
      // Skeleton deve ter 4 espaços (dentro da segunda)
      expect(result).toMatch(/^    <Skeleton \/>/m);
    });

    it('should handle self-closing tags', () => {
      const input = '<div className="flex" />\n<Skeleton />';
      const result = formatJSX(input, 2);
      expect(result.split('\n').length).toBeGreaterThan(1);
    });

    it('should handle empty divs', () => {
      const input = '<div className="flex"></div>';
      const result = formatJSX(input, 2);
      expect(result).toContain('<div');
      expect(result).toContain('</div>');
    });
  });

  describe('minifyJSX', () => {
    it('should remove unnecessary whitespace', () => {
      const input = '<div className="flex">\n  <Skeleton />\n</div>';
      const result = minifyJSX(input);
      expect(result).not.toContain('\n');
      expect(result).toContain('<div');
      expect(result).toContain('</div>');
    });

    it('should remove spaces between tags', () => {
      const input = '<div> </div> <div> </div>';
      const result = minifyJSX(input);
      expect(result).toMatch(/></);
    });
  });

  describe('formatJSXWithOptions', () => {
    it('should format with pretty print by default', () => {
      const input = '<div className="flex flex-col">\n<Skeleton />\n</div>';
      const result = formatJSXWithOptions(input);
      expect(result.split('\n').length).toBeGreaterThan(1);
    });

    it('should minify when pretty is false', () => {
      const input = '<div className="flex flex-col">\n  <Skeleton />\n</div>';
      const result = formatJSXWithOptions(input, { pretty: false });
      expect(result.split('\n').length).toBe(1);
    });

    it('should remove duplicate classes when removeDuplicates is true', () => {
      const input = '<div className="flex flex flex-col"></div>';
      const result = formatJSXWithOptions(input, { removeDuplicates: true });
      expect(result).not.toContain('flex flex flex');
    });

    it('should use custom indent size', () => {
      const input = '<div><div><Skeleton /></div></div>';
      const result = formatJSXWithOptions(input, { indentSize: 4 });
      expect(result).toContain('    <div');
    });
  });
});

