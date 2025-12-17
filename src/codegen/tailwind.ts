/**
 * Tailwind CSS Helpers
 * 
 * Converts AST properties to Tailwind CSS classes.
 */

import type { Stack, Skeleton } from '../ast/types.js';

/**
 * Converts Stack properties to Tailwind classes
 */
export function stackToTailwind(stack: Stack): string[] {
  const classes: string[] = [];
  
  // Gap
  if (stack.gap !== undefined) {
    classes.push(`gap-${stack.gap}`);
  }
  
  // Margin
  if (stack.margin !== undefined) {
    classes.push(`m-${stack.margin}`);
  }
  if (stack.marginTop !== undefined) {
    classes.push(`mt-${stack.marginTop}`);
  }
  if (stack.marginRight !== undefined) {
    classes.push(`mr-${stack.marginRight}`);
  }
  if (stack.marginBottom !== undefined) {
    classes.push(`mb-${stack.marginBottom}`);
  }
  if (stack.marginLeft !== undefined) {
    classes.push(`ml-${stack.marginLeft}`);
  }
  if (stack.marginX !== undefined) {
    classes.push(`mx-${stack.marginX}`);
  }
  if (stack.marginY !== undefined) {
    classes.push(`my-${stack.marginY}`);
  }
  
  // Padding
  if (stack.padding !== undefined) {
    classes.push(`p-${stack.padding}`);
  }
  if (stack.paddingTop !== undefined) {
    classes.push(`pt-${stack.paddingTop}`);
  }
  if (stack.paddingRight !== undefined) {
    classes.push(`pr-${stack.paddingRight}`);
  }
  if (stack.paddingBottom !== undefined) {
    classes.push(`pb-${stack.paddingBottom}`);
  }
  if (stack.paddingLeft !== undefined) {
    classes.push(`pl-${stack.paddingLeft}`);
  }
  if (stack.paddingX !== undefined) {
    classes.push(`px-${stack.paddingX}`);
  }
  if (stack.paddingY !== undefined) {
    classes.push(`py-${stack.paddingY}`);
  }
  
  // Border
  if (stack.border) {
    classes.push('border');
  }
  if (stack.borderTop) {
    classes.push('border-t');
  }
  if (stack.borderRight) {
    classes.push('border-r');
  }
  if (stack.borderBottom) {
    classes.push('border-b');
  }
  if (stack.borderLeft) {
    classes.push('border-l');
  }
  
  // Flex
  if (stack.flex !== undefined) {
    if (stack.flex === 1) {
      classes.push('flex-1');
    } else {
      classes.push(`flex-${stack.flex}`);
    }
  }
  
  return classes;
}

/**
 * Converts Skeleton properties to Tailwind classes
 */
export function skeletonToTailwind(skeleton: Skeleton): string[] {
  const classes: string[] = [];
  
  // Width
  if (skeleton.width !== undefined) {
    if (skeleton.width === 'auto') {
      classes.push('w-auto');
    } else if (skeleton.width === 'full') {
      classes.push('w-full');
    } else if (skeleton.width === 'screen') {
      classes.push('w-screen');
    } else if (typeof skeleton.width === 'number') {
      if (skeleton.width < 1 && skeleton.width > 0) {
        // Decimal - convert to percentage
        const percentage = Math.round(skeleton.width * 100);
        classes.push(`w-[${percentage}%]`);
      } else {
        // Integer - use default Tailwind class
        classes.push(`w-${skeleton.width}`);
      }
    }
  }
  
  // Height
  if (skeleton.height !== undefined) {
    if (skeleton.height === 'auto') {
      classes.push('h-auto');
    } else if (skeleton.height === 'full') {
      classes.push('h-full');
    } else if (skeleton.height === 'screen') {
      classes.push('h-screen');
    } else if (typeof skeleton.height === 'number') {
      classes.push(`h-${skeleton.height}`);
    }
  }
  
  // Rounded
  if (skeleton.rounded) {
    classes.push('rounded-full');
  }
  
  // Shrink
  if (skeleton.shrink === false) {
    classes.push('shrink-0');
  }
  
  // Background
  if (skeleton.background) {
    classes.push(`bg-${skeleton.background}`);
  }
  
  return classes;
}

/**
 * Combines Tailwind classes into a string
 */
export function combineClasses(classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Removes duplicate Tailwind classes
 */
export function deduplicateClasses(classes: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  
  for (const cls of classes) {
    if (!seen.has(cls)) {
      seen.add(cls);
      unique.push(cls);
    }
  }
  
  return unique;
}

