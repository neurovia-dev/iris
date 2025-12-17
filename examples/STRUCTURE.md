# IRIS Examples Structure

```
examples/
├── basic/                    # Basic and simple examples
│   ├── hello-world.iris      # Minimal example
│   ├── card.iris             # Content card
│   ├── example.iris          # Complete example from README
│   └── *.jsx                 # Compiled outputs
│
├── projects/                 # Complete projects with Vite + React + Tailwind
│   ├── todolist/             # Todo list
│   │   ├── app.iris          # IRIS code
│   │   ├── package.json      # Dependencies
│   │   ├── vite.config.ts    # Vite config
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   ├── index.html
│   │   └── src/
│   │       ├── App.tsx        # Generated from app.iris
│   │       ├── Skeleton.tsx   # Custom component
│   │       ├── main.tsx
│   │       └── index.css
│   │
│   ├── profile/              # User profile
│   │   └── [same structure]
│   │
│   └── dashboard/            # Complete dashboard
│       └── [same structure]
│
├── README.md                 # Main documentation
└── compile-all.sh            # Script to compile everything
```

## How to use

### Basic Examples
```bash
# Compile a basic example
node dist/cli/index.js examples/basic/hello-world.iris -o output.jsx
```

### Complete Projects
```bash
# 1. Enter the project
cd examples/projects/todolist

# 2. Install dependencies
npm install

# 3. (Optional) Recompile IRIS
cd ../..
node dist/cli/index.js examples/projects/todolist/app.iris -o examples/projects/todolist/src/App.tsx

# 4. Run the project
cd examples/projects/todolist
npm run dev
```

## Project Technologies

All projects in `projects/` include:
- ⚡ Vite 5 - Build tool and dev server
- ⚛️ React 18 - UI framework
- 📘 TypeScript - Type safety
- 🎨 Tailwind CSS 3 - Styling
- 🔄 Custom Skeleton component
