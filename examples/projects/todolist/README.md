# TodoList - IRIS Example with Vite + React + Tailwind

This is a complete React project example using IRIS to generate UI skeletons.

## Structure

- `app.iris` - IRIS source code
- `src/App.tsx` - Generated React component (can be recompiled)
- `src/Skeleton.tsx` - Custom Skeleton component
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind configuration

## How to use

### 1. Install dependencies

```bash
npm install
```

### 2. Compile IRIS (optional)

If you modify `app.iris`, recompile:

```bash
# From IRIS root directory
node dist/cli/index.js examples/projects/todolist/app.iris -o examples/projects/todolist/src/App.tsx
```

### 3. Run the project

```bash
npm run dev
```

The project will be available at `http://localhost:5173`

## Production build

```bash
npm run build
npm run preview
```

