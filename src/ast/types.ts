/**
 * IRIS AST Types v0.5
 * 
 * Canonical definitions of AST node types according to specification.
 * Expanded with complete vocabulary for padding, margin, border, etc.
 */

export type Node = VStack | HStack | Skeleton | Repeat;

/**
 * Absolute values for width/height
 */
export type AbsoluteSize = 'full' | 'screen' | 'auto';

/**
 * Vertical or horizontal stack
 */
export interface Stack {
  type: 'VStack' | 'HStack';
  gap?: number;
  // Margin (expanded)
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginX?: number;
  marginY?: number;
  // Padding (expanded)
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingX?: number;
  paddingY?: number;
  // Border (expanded)
  border?: boolean;
  borderTop?: boolean;
  borderRight?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  flex?: number;
  children: Node[];
}

/**
 * VStack - Vertical stack
 */
export interface VStack extends Stack {
  type: 'VStack';
}

/**
 * HStack - Horizontal stack
 */
export interface HStack extends Stack {
  type: 'HStack';
}

/**
 * Skeleton - Placeholder element
 */
export interface Skeleton {
  type: 'Skeleton';
  width?: number | AbsoluteSize;
  height?: number | AbsoluteSize;
  rounded?: boolean;
  shrink?: boolean;
  background?: string; // Basic color (e.g., 'gray-200')
}

/**
 * Repeat - Repetition of a node
 */
export interface Repeat {
  type: 'Repeat';
  count: number;
  child: Node;
}

/**
 * Program - Multiple nodes at top level (used internally by parser)
 */
export interface Program {
  type: 'Program';
  children: Node[];
}

