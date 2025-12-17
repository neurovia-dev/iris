/**
 * AST Builder Helpers
 * 
 * Helper functions to build AST nodes in a type-safe way.
 */

import type { VStack, HStack, Skeleton, Repeat, Node, Stack } from './types.js';

export interface VStackOptions extends Partial<Omit<Stack, 'type' | 'children'>> {
  children?: Node[];
}

export interface HStackOptions extends Partial<Omit<Stack, 'type' | 'children'>> {
  children?: Node[];
}

export interface SkeletonOptions extends Partial<Omit<Skeleton, 'type'>> {}

/**
 * Creates a VStack
 */
export function vStack(options: VStackOptions = {}): VStack {
  const { children, ...rest } = options;
  return {
    type: 'VStack',
    children: children || [],
    ...rest,
  };
}

/**
 * Creates an HStack
 */
export function hStack(options: HStackOptions = {}): HStack {
  const { children, ...rest } = options;
  return {
    type: 'HStack',
    children: children || [],
    ...rest,
  };
}

/**
 * Creates a Skeleton
 */
export function skeleton(options: SkeletonOptions = {}): Skeleton {
  return {
    type: 'Skeleton',
    ...options,
  };
}

/**
 * Creates a Repeat
 */
export function repeat(count: number, child: Node): Repeat {
  return {
    type: 'Repeat',
    count,
    child,
  };
}

