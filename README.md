# IRIS - AI-first UI DSL

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

**IRIS** is a simple, AI-optimized language for describing UI layouts. Write less code, get more done.

> "AI doesn't generate final code. It generates structured intention. The compiler resolves the rest."

## What is IRIS?

IRIS is a **domain-specific language (DSL)** designed to bridge the gap between AI assistants and UI code. Instead of generating complex React/JSX directly, AI can generate simple IRIS code, which is then compiled into production-ready React components with Tailwind CSS.

### Why IRIS?

- 🎯 **AI-Friendly**: Minimal vocabulary that reduces AI errors and token usage
- 🚀 **Fast Development**: Describe layouts in seconds, not minutes
- 🔒 **Consistent**: One way to express each concept, eliminating ambiguity
- 📦 **Production-Ready**: Compiles to clean, optimized React + Tailwind code
- 🎨 **Human-Readable**: Easy to understand and modify

### Real Example

**Input (IRIS):**
```iris
V(g4){
  S(h4)
  S(h3)
}
```

**Output (React + Tailwind):**
```jsx
<div className="flex flex-col gap-4">
  <Skeleton className="h-4" />
  <Skeleton className="h-3" />
</div>
```

## Quick Start

### Installation

```bash
npm install
npm run build
```

### Use the CLI

```bash
# Compile an IRIS file to JSX
node dist/cli/index.js input.iris -o output.jsx
```

### Use the API

```typescript
import { compile } from 'iris';

const jsx = compile(`
  V(g4){
    S(h4)
    S(h3)
  }
`);
```

## Language Basics

IRIS uses a simple, declarative syntax. Here's everything you need to know:

### Layout Elements

- **`V`** - Vertical stack (column)
- **`H`** - Horizontal stack (row)
- **`S`** - Skeleton (placeholder element)
- **`xN`** - Repeat N times

### Spacing

- **`g`** - gap between children
- **`m`** - margin (all sides)
- **`mt`, `mr`, `mb`, `ml`** - margin on specific sides
- **`mx`, `my`** - margin on horizontal/vertical axis
- **`p`** - padding (all sides)
- **`pt`, `pr`, `pb`, `pl`** - padding on specific sides
- **`px`, `py`** - padding on horizontal/vertical axis

### Borders

- **`b`** - border (all sides)
- **`bt`, `br`, `bb`, `bl`** - border on specific sides

### Skeleton Properties

- **`w`** - width (number, `full`, `screen`, `auto`, or decimal like `0.75`)
- **`h`** - height (number, `full`, `screen`, `auto`)
- **`r`** - rounded (full border radius)
- **`sh0`** - don't shrink (flex-shrink: 0)
- **`bg`** - background color (e.g., `bg-gray-200`)

### Layout

- **`f`** - flex value (number or `f` for flex-1)

## Examples

### Simple Card

```iris
V(p4 g4){
  S(w20 h20 r)  // Avatar
  V(g2){
    S(h6 w-full)  // Title
    S(h4 w.75)    // Subtitle
  }
}
```

### List with Items

```iris
V(g4 mb6 pb6 bb){
  x3{
    H(g4 mb4){
      S(w16 h16 r sh0)  // Icon
      V(g2 f1){
        S(h4 w-full)    // Title
        S(h3 w.75)      // Description
      }
    }
  }
}
```

### Complex Layout

```iris
V(p4 m6 g8){
  // Header section
  V(p4 pb6 bb g4){
    S(h8 w-full)  // Main title
    S(h4 w.75)    // Subtitle
  }
  
  // Content card
  V(p4 pt6 pr8 pb4 pl2 mx4 my2 bt br bb bl g4){
    S(w16 h16 r)  // Avatar
    V(g2){
      S(h6 w-full)  // Name
      S(h4 w.5)     // Email
    }
  }
  
  // Full-width banner
  S(w-screen h-32 bg-gray-200)
  
  // List items
  x3{
    H(g4 mb4){
      S(w16 h16 r sh0)
      V(g2 f1){
        S(h4 w-full)
        S(h3 w.75)
      }
    }
  }
}
```

## Comments

IRIS supports comments for better readability:

```iris
// Line comment
V(g4){
  S(h4)  // Inline comment
}

/* Block comment
   spanning multiple lines */
```

## API Reference

### `compile(irisCode: string, options?: CompileOptions): string`

Compiles IRIS code to JSX/TSX.

```typescript
import { compile } from 'iris';

const jsx = compile('V(g4){ S(h4) }', {
  pretty: true,           // Format output (default: true)
  indentSize: 2,          // Indentation size (default: 2)
  removeDuplicates: true, // Remove duplicate classes (default: true)
  useFragment: true      // Use Fragment for multiple top-level nodes (default: true)
});
```

### `parseIris(irisCode: string): Node`

Parses IRIS code and returns the AST.

```typescript
import { parseIris } from 'iris';

const ast = parseIris('V(g4){ S(h4) }');
```

### `compileFile(filePath: string, options?: CompileOptions): string`

Compiles a `.iris` file to JSX/TSX.

```typescript
import { compileFile } from 'iris';

const jsx = compileFile('./layout.iris');
```

## CLI Usage

### Compile a File

```bash
node dist/cli/index.js input.iris -o output.jsx
```

### Watch Mode

Automatically recompile when the file changes:

```bash
node dist/cli/index.js input.iris -o output.jsx --watch
```

### Compile from stdin

```bash
echo 'V(g4){ S(h4) }' | node dist/cli/index.js compile -o output.jsx
```

## Complete Projects

IRIS comes with complete example projects to help you get started:

### Todo List

A complete todo list application with repeated items.

```bash
cd examples/projects/todolist
npm install
npm run dev
```

### User Profile

A user profile page with avatar, information sections, and layout examples.

```bash
cd examples/projects/profile
npm install
npm run dev
```

### Dashboard

A full dashboard with header, metric cards, and item lists.

```bash
cd examples/projects/dashboard
npm install
npm run dev
```

Each project includes:
- ✅ Vite for fast development
- ✅ React 18 + TypeScript
- ✅ Tailwind CSS for styling
- ✅ Custom Skeleton component
- ✅ IRIS file that generates the main component

## VS Code Extension

Get syntax highlighting and code snippets for IRIS files:

1. Copy `vscode-extension/` to `~/.vscode/extensions/iris-language/`
2. Reload VS Code
3. Open any `.iris` file

**Features:**
- Syntax highlighting
- Code snippets (`V`, `H`, `S`, `x`, etc.)
- Comment support
- Auto-closing brackets

## How It Works

IRIS follows a simple compilation pipeline:

```
IRIS DSL (text)
    ↓
Parser (PEG grammar)
    ↓
AST (structured data)
    ↓
Code Generator (React + Tailwind)
    ↓
JSX/TSX output
```

The AST (Abstract Syntax Tree) is the canonical representation. All transformations happen at this level, making it easy to:
- Validate code
- Transform to different outputs
- Optimize the generated code

## Use Cases

### 1. AI-Assisted Development

Let AI generate IRIS code instead of complex React. The compiler handles the details:

```
AI Prompt: "Create a card with avatar, title, and description"
AI Output: IRIS code (simple, unambiguous)
Compiler: React + Tailwind (production-ready)
```

### 2. Rapid Prototyping

Quickly describe layouts without writing full React components:

```iris
V(g4){
  H(g4){
    S(w16 h16 r)
    V(g2){
      S(h6 w-full)
      S(h4 w.75)
    }
  }
}
```

### 3. Design System Documentation

Use IRIS as a way to document layout patterns in a language-agnostic way.

### 4. Code Generation Tools

Build tools that generate IRIS code, which then compiles to any target framework.

## Project Status

**Current Version: v0.5**

✅ **Completed:**
- Core language implementation
- React + Tailwind code generation
- CLI and API
- Expanded vocabulary (padding, margin, border)
- Comment support
- JSX formatting and optimization
- AST validation
- VS Code extension (basic)
- 129 tests passing

🔄 **In Progress:**
- Additional components (Text, Image, Button)
- Multiple backends (Vue, Svelte)
- Online playground

📋 **Planned:**
- Logic and conditionals
- State management
- Symbolic mode (variables, themes)
- AI integration plugins

See [NEXT_STEPS.md](./NEXT_STEPS.md) for the full roadmap.

## Installation & Setup

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Quick Setup

```bash
# Clone the repository
git clone <repository-url>
cd iris

# Install dependencies
npm install

# Build the project
npm run build
```

### Development Setup

```bash
# Install with nvm (recommended)
npm run setup

# Or manually
npm install

# Build
npm run build

# Run tests
npm test

# Watch mode for development
npm run dev
```

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Project Structure

```
iris/
├── spec/              # Grammar specification
├── src/               # Source code
│   ├── ast/           # AST definitions
│   ├── parser/        # Parser implementation
│   ├── codegen/       # Code generation
│   └── cli/           # CLI tool
├── tests/             # Test suite
├── examples/          # Example projects
└── vscode-extension/  # VS Code extension
```

## Contributing

Contributions are welcome! Here's how you can help:

1. **Report bugs**: Open an issue with a clear description
2. **Suggest features**: Share your ideas for improvements
3. **Submit PRs**: Fork, make changes, add tests, submit
4. **Improve docs**: Help make IRIS more accessible

### Development Workflow

```bash
# Fork and clone
git clone <your-fork-url>
cd iris

# Install dependencies
npm install

# Make changes
# Add tests
# Run tests
npm test

# Submit PR
```

## License

MIT License - see LICENSE file for details.

## Philosophy

IRIS is built on a simple principle:

> **"AI doesn't generate final code. It generates structured intention. The compiler resolves the rest."**

This separation allows:
- AI to focus on **what** to build, not **how**
- Compilers to optimize and transform code
- Developers to understand and modify layouts easily

## Resources

- **Examples**: See `examples/` directory
- **Tests**: See `tests/` directory for usage examples
- **Roadmap**: See [NEXT_STEPS.md](./NEXT_STEPS.md)
- **Grammar**: See `spec/grammar.peg`

## Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/iris/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/iris/discussions)

---

**Made with ❤️ for the AI-first development community**

*IRIS - Where AI intention meets production code*
