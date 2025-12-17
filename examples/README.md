# IRIS Examples

This folder contains practical examples of IRIS usage, organized by category.

## Structure

```
examples/
  basic/              # Basic and simple examples
    hello-world.iris
    card.iris
    example.iris      # Complete example from main README
  
  projects/           # Complete projects with Vite + React + Tailwind
    todolist/         # Todo list
    profile/          # User profile
    dashboard/        # Complete dashboard
```

## Basic Examples

### hello-world.iris
Minimal Hello World example with vertical and horizontal layout.

### card.iris
Content card with image, text, and actions.

### example.iris
The complete example from the main project README.

## Complete Projects

All projects in the `projects/` folder are complete React projects with:
- ✅ Vite for build and dev server
- ✅ React 18
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ Custom Skeleton component
- ✅ `app.iris` file that generates `src/App.tsx`

### How to use a project

1. Enter the project folder:
```bash
cd examples/projects/todolist
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Recompile IRIS if you modified `app.iris`:
```bash
# From IRIS root directory
node dist/cli/index.js examples/projects/todolist/app.iris -o examples/projects/todolist/src/App.tsx
```

4. Run the project:
```bash
npm run dev
```

The project will be available at `http://localhost:5173`

## Compile all examples

Use the helper script:

```bash
./examples/compile-all.sh
```

Or manually:

```bash
# From IRIS root directory
node dist/cli/index.js examples/basic/hello-world.iris -o examples/basic/hello-world.jsx
node dist/cli/index.js examples/projects/todolist/app.iris -o examples/projects/todolist/src/App.tsx
# etc...
```

## Available Projects

### TodoList
Todo list with header and repeated items. Demonstrates use of `Repeat` and nested layouts.

### Profile
User profile with avatar, personal information, and sections. Demonstrates complex layouts.

### Dashboard
Complete dashboard with header, metric cards, and item list. Demonstrates more complex structure.
