#!/bin/bash

# Script to compile all IRIS examples

cd "$(dirname "$0")/.."

echo "🔨 Compiling all IRIS examples..."
echo ""

# Compile basic examples
echo "📝 Compiling basic examples..."
for file in examples/basic/*.iris; do
  if [ -f "$file" ]; then
    filename=$(basename "$file" .iris)
    echo "  → $filename..."
    node -e "
      const {compileFile} = require('./dist/index.js');
      try {
        const jsx = compileFile('$file');
        require('fs').writeFileSync('examples/basic/$filename.jsx', jsx);
        console.log('    ✓ examples/basic/$filename.jsx');
      } catch(e) {
        console.error('    ✗ Error:', e.message);
      }
    "
  fi
done

echo ""
echo "📦 Compiling complete projects..."

# Compile projects
for dir in examples/projects/*/; do
  if [ -f "${dir}app.iris" ]; then
    project=$(basename "$dir")
    echo "  → $project..."
    node -e "
      const {compileFile} = require('./dist/index.js');
      try {
        const jsx = compileFile('${dir}app.iris');
        require('fs').writeFileSync('${dir}src/App.tsx', jsx);
        console.log('    ✓ ${dir}src/App.tsx');
      } catch(e) {
        console.error('    ✗ Error:', e.message);
      }
    "
  fi
done

echo ""
echo "✨ Compilation complete!"
