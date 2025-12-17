/**
 * Tests for AST Validator
 */

import { describe, it, expect } from 'vitest';
import { validateNode, ValidationError } from '../../src/parser/validator.js';
import { vStack, hStack, skeleton, repeat } from '../../src/ast/builder.js';

describe('validator', () => {
  describe('validateStack', () => {
    it('should throw error for negative gap', () => {
      const stack = vStack({ gap: -1 });
      expect(() => validateNode(stack)).toThrow(ValidationError);
    });

    it('should throw error for negative margin', () => {
      const stack = vStack({ margin: -5 });
      expect(() => validateNode(stack)).toThrow(ValidationError);
    });

    it('should throw error for negative padding', () => {
      const stack = vStack({ padding: -3 });
      expect(() => validateNode(stack)).toThrow(ValidationError);
    });

    it('should throw error for negative flex', () => {
      const stack = vStack({ flex: -1 });
      expect(() => validateNode(stack)).toThrow(ValidationError);
    });

    it('should accept valid values', () => {
      const stack = vStack({
        gap: 4,
        margin: 6,
        padding: 8,
        flex: 1,
      });
      expect(() => validateNode(stack)).not.toThrow();
    });

    it('should validate all margin properties', () => {
      const props = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY'];
      for (const prop of props) {
        const stack = vStack({ [prop]: -1 } as any);
        expect(() => validateNode(stack)).toThrow(ValidationError);
      }
    });

    it('should validate all padding properties', () => {
      const props: Array<keyof typeof vStack extends (...args: any[]) => infer R ? R : never> = ['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY'] as any;
      for (const prop of props) {
        const stack = { ...vStack({}), [prop]: -1 } as any;
        expect(() => validateNode(stack)).toThrow(ValidationError);
      }
    });
  });

  describe('validateSkeleton', () => {
    it('should throw error for zero width', () => {
      const sk = skeleton({ width: 0 });
      expect(() => validateNode(sk)).toThrow(ValidationError);
    });

    it('should throw error for negative width', () => {
      const sk = skeleton({ width: -5 });
      expect(() => validateNode(sk)).toThrow(ValidationError);
    });

    it('should throw error for zero height', () => {
      const sk = skeleton({ height: 0 });
      expect(() => validateNode(sk)).toThrow(ValidationError);
    });

    it('should throw error for negative height', () => {
      const sk = skeleton({ height: -3 });
      expect(() => validateNode(sk)).toThrow(ValidationError);
    });

    it('should accept valid width and height', () => {
      const sk = skeleton({ width: 16, height: 4 });
      expect(() => validateNode(sk)).not.toThrow();
    });

    it('should accept absolute sizes', () => {
      const sk = skeleton({ width: 'full', height: 'screen' });
      expect(() => validateNode(sk)).not.toThrow();
    });
  });

  describe('validateRepeat', () => {
    it('should throw error for zero count', () => {
      const r = repeat(0, skeleton({ height: 4 }));
      expect(() => validateNode(r)).toThrow(ValidationError);
    });

    it('should throw error for negative count', () => {
      const r = repeat(-5, skeleton({ height: 4 }));
      expect(() => validateNode(r)).toThrow(ValidationError);
    });

    it('should throw error for non-integer count', () => {
      const r = repeat(3.5 as any, skeleton({ height: 4 }));
      expect(() => validateNode(r)).toThrow(ValidationError);
    });

    it('should accept valid count', () => {
      const r = repeat(5, skeleton({ height: 4 }));
      expect(() => validateNode(r)).not.toThrow();
    });
  });

  describe('nested validation', () => {
    it('should validate nested stacks', () => {
      const stack = vStack({
        children: [
          hStack({ gap: -1 }),
        ],
      });
      expect(() => validateNode(stack)).toThrow(ValidationError);
    });

    it('should validate nested skeletons', () => {
      const stack = vStack({
        children: [
          skeleton({ width: -5 }),
        ],
      });
      expect(() => validateNode(stack)).toThrow(ValidationError);
    });

    it('should validate children of repeat', () => {
      const r = repeat(3, skeleton({ height: -1 }));
      expect(() => validateNode(r)).toThrow(ValidationError);
    });
  });
});

