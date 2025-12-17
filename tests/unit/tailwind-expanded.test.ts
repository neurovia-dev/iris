/**
 * Tests for Expanded Tailwind Vocabulary
 */

import { describe, it, expect } from 'vitest';
import { stackToTailwind, skeletonToTailwind } from '../../src/codegen/tailwind.js';
import { vStack, hStack, skeleton } from '../../src/ast/builder.js';

describe('tailwind-expanded', () => {
  describe('stackToTailwind - expanded vocabulary', () => {
    it('should handle all margin properties', () => {
      const stack = vStack({
        margin: 4,
        marginTop: 2,
        marginRight: 3,
        marginBottom: 6,
        marginLeft: 1,
        marginX: 5,
        marginY: 8,
      });
      
      const classes = stackToTailwind(stack);
      expect(classes).toContain('m-4');
      expect(classes).toContain('mt-2');
      expect(classes).toContain('mr-3');
      expect(classes).toContain('mb-6');
      expect(classes).toContain('ml-1');
      expect(classes).toContain('mx-5');
      expect(classes).toContain('my-8');
    });

    it('should handle all padding properties', () => {
      const stack = vStack({
        padding: 4,
        paddingTop: 2,
        paddingRight: 3,
        paddingBottom: 6,
        paddingLeft: 1,
        paddingX: 5,
        paddingY: 8,
      });
      
      const classes = stackToTailwind(stack);
      expect(classes).toContain('p-4');
      expect(classes).toContain('pt-2');
      expect(classes).toContain('pr-3');
      expect(classes).toContain('pb-6');
      expect(classes).toContain('pl-1');
      expect(classes).toContain('px-5');
      expect(classes).toContain('py-8');
    });

    it('should handle all border properties', () => {
      const stack = vStack({
        border: true,
        borderTop: true,
        borderRight: true,
        borderBottom: true,
        borderLeft: true,
      });
      
      const classes = stackToTailwind(stack);
      expect(classes).toContain('border');
      expect(classes).toContain('border-t');
      expect(classes).toContain('border-r');
      expect(classes).toContain('border-b');
      expect(classes).toContain('border-l');
    });

    it('should maintain backward compatibility with old properties', () => {
      const stack = vStack({
        gap: 4,
        marginBottom: 6,
        paddingBottom: 8,
        borderBottom: true,
        flex: 1,
      });
      
      const classes = stackToTailwind(stack);
      expect(classes).toContain('gap-4');
      expect(classes).toContain('mb-6');
      expect(classes).toContain('pb-8');
      expect(classes).toContain('border-b');
      expect(classes).toContain('flex-1');
    });
  });

  describe('skeletonToTailwind - expanded vocabulary', () => {
    it('should handle absolute width values', () => {
      const sk = skeleton({ width: 'full' });
      const classes = skeletonToTailwind(sk);
      expect(classes).toContain('w-full');
    });

    it('should handle absolute height values', () => {
      const sk = skeleton({ height: 'screen' });
      const classes = skeletonToTailwind(sk);
      expect(classes).toContain('h-screen');
    });

    it('should handle auto width and height', () => {
      const sk = skeleton({ width: 'auto', height: 'auto' });
      const classes = skeletonToTailwind(sk);
      expect(classes).toContain('w-auto');
      expect(classes).toContain('h-auto');
    });

    it('should handle background color', () => {
      const sk = skeleton({ background: 'gray-200' });
      const classes = skeletonToTailwind(sk);
      expect(classes).toContain('bg-gray-200');
    });

    it('should maintain backward compatibility', () => {
      const sk = skeleton({
        width: 0.75,
        height: 4,
        rounded: true,
        shrink: false,
      });
      
      const classes = skeletonToTailwind(sk);
      expect(classes).toContain('w-[75%]');
      expect(classes).toContain('h-4');
      expect(classes).toContain('rounded-full');
      expect(classes).toContain('shrink-0');
    });

    it('should handle all absolute size combinations', () => {
      const sizes: Array<'full' | 'screen' | 'auto'> = ['full', 'screen', 'auto'];
      
      for (const width of sizes) {
        for (const height of sizes) {
          const sk = skeleton({ width, height });
          const classes = skeletonToTailwind(sk);
          expect(classes).toContain(`w-${width}`);
          expect(classes).toContain(`h-${height}`);
        }
      }
    });
  });
});

