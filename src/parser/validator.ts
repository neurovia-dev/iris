/**
 * AST Validator
 * 
 * Validates AST values to ensure they are within valid ranges.
 */

import type { Node, Stack, Skeleton } from '../ast/types.js';

/**
 * Validation errors
 */
export class ValidationError extends Error {
  constructor(message: string, public node?: Node) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Validates an AST node
 */
export function validateNode(node: Node): void {
  switch (node.type) {
    case 'VStack':
    case 'HStack':
      validateStack(node);
      // Validate children recursively
      for (const child of node.children) {
        validateNode(child);
      }
      break;
    
    case 'Skeleton':
      validateSkeleton(node);
      break;
    
    case 'Repeat':
      validateRepeat(node);
      validateNode(node.child);
      break;
  }
}

/**
 * Validates Stack properties
 */
function validateStack(stack: Stack): void {
  // Gap must be >= 0
  if (stack.gap !== undefined && stack.gap < 0) {
    throw new ValidationError(`Invalid gap value: ${stack.gap}. Must be >= 0.`, stack);
  }
  
  // Margin must be >= 0
  const marginProps = ['margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY'];
  for (const prop of marginProps) {
    const value = stack[prop as keyof Stack];
    if (typeof value === 'number' && value < 0) {
      throw new ValidationError(`Invalid ${prop} value: ${value}. Must be >= 0.`, stack);
    }
  }
  
  // Padding must be >= 0
  const paddingProps = ['padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY'];
  for (const prop of paddingProps) {
    const value = stack[prop as keyof Stack];
    if (typeof value === 'number' && value < 0) {
      throw new ValidationError(`Invalid ${prop} value: ${value}. Must be >= 0.`, stack);
    }
  }
  
  // Flex must be >= 0
  if (stack.flex !== undefined && stack.flex < 0) {
    throw new ValidationError(`Invalid flex value: ${stack.flex}. Must be >= 0.`, stack);
  }
}

/**
 * Validates Skeleton properties
 */
function validateSkeleton(skeleton: Skeleton): void {
  // Numeric width must be > 0
  if (typeof skeleton.width === 'number') {
    if (skeleton.width <= 0) {
      throw new ValidationError(`Invalid width value: ${skeleton.width}. Must be > 0.`, skeleton);
    }
  }
  
  // Numeric height must be > 0
  if (typeof skeleton.height === 'number') {
    if (skeleton.height <= 0) {
      throw new ValidationError(`Invalid height value: ${skeleton.height}. Must be > 0.`, skeleton);
    }
  }
}

/**
 * Validates Repeat properties
 */
function validateRepeat(repeat: { type: 'Repeat'; count: number; child: Node }): void {
  // Count must be > 0
  if (repeat.count <= 0) {
    throw new ValidationError(`Invalid repeat count: ${repeat.count}. Must be > 0.`, repeat);
  }
  
  // Count must be an integer
  if (!Number.isInteger(repeat.count)) {
    throw new ValidationError(`Invalid repeat count: ${repeat.count}. Must be an integer.`, repeat);
  }
}

