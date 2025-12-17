/**
 * JSX Formatter
 * 
 * Formats generated JSX with consistent indentation and optimizations.
 */

/**
 * Removes duplicate Tailwind classes from a class string
 */
export function removeDuplicateClasses(className: string): string {
  const classes = className.split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const unique: string[] = [];
  
  for (const cls of classes) {
    if (!seen.has(cls)) {
      seen.add(cls);
      unique.push(cls);
    }
  }
  
  return unique.join(' ');
}

/**
 * Formats JSX with consistent indentation
 */
export function formatJSX(jsx: string, indentSize: number = 2): string {
  // If no line breaks, add breaks before opening and closing tags
  let processed = jsx;
  if (!processed.includes('\n')) {
    // Add break after opening tags (except self-closing)
    processed = processed.replace(/(<[^/!][^>]*>)(?!\s*<\/)/g, '$1\n');
    // Add break before closing tags
    processed = processed.replace(/([^>])(<\/)/g, '$1\n$2');
    // Add break after closing tags (except at end)
    processed = processed.replace(/(<\/[^>]+>)(?!\s*$)/g, '$1\n');
  }
  
  const lines = processed.split('\n');
  const formatted: string[] = [];
  let indentLevel = 0;
  const indentStr = ' '.repeat(indentSize);
  
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (!trimmed) {
      continue; // Skip empty lines
    }
    
    // Decrement indent before closing tags
    if (trimmed.startsWith('</')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    // Add line with indentation
    formatted.push(indentStr.repeat(indentLevel) + trimmed);
    
    // Increment indent after opening tags (but not self-closing and not if closing tag is on same line)
    if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.includes('</')) {
      indentLevel++;
    }
  }
  
  return formatted.join('\n');
}

/**
 * Minifies JSX by removing unnecessary whitespace
 */
export function minifyJSX(jsx: string): string {
  return jsx
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

/**
 * Formatting options
 */
export interface FormatOptions {
  pretty?: boolean;
  indentSize?: number;
  removeDuplicates?: boolean;
}

/**
 * Formats JSX according to the options
 */
export function formatJSXWithOptions(jsx: string, options: FormatOptions = {}): string {
  const {
    pretty = true,
    indentSize = 2,
    removeDuplicates = true,
  } = options;
  
  let formatted = jsx;
  
  // Remove duplicate classes if necessary
  if (removeDuplicates) {
    formatted = formatted.replace(
      /className="([^"]+)"/g,
      (match, classes) => `className="${removeDuplicateClasses(classes)}"`
    );
  }
  
  // Apply formatting
  if (pretty) {
    return formatJSX(formatted, indentSize);
  } else {
    return minifyJSX(formatted);
  }
}

