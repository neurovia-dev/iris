# Next Steps - IRIS

## Current Status (v0 - Complete ✅)

- ✅ AST v0 implemented (VStack, HStack, Skeleton, Repeat)
- ✅ Functional PEG parser
- ✅ React codegen with Tailwind
- ✅ Functional CLI
- ✅ Public API
- ✅ 129 tests passing (100%)
- ✅ Organized practical examples

---

## Suggested Next Steps

### Phase 1: Improvements and Polish (Short Term)

#### 1.1 Codegen Improvements
- [x] **Improved JSX formatting**: Consistent indentation, line breaks
- [x] **Tailwind class optimization**: Remove duplicate classes, optimize spacing
- [x] **Fragment support**: Allow multiple nodes at top level without wrapper
- [x] **Pretty print**: Option for formatted vs minified JSX

#### 1.2 Vocabulary Expansion v0
- [x] **Complete Padding/Margin**: `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py` (not just `pb`, `mb`)
- [x] **Complete Border**: `border`, `borderTop`, `borderLeft`, `borderRight` (not just `borderBottom`)
- [x] **Absolute Width/Height**: Support for values like `w-full`, `h-screen`
- [x] **Background and basic colors**: `bg`, `text` (for more realistic skeletons)

#### 1.3 Parser Improvements
- [x] **More descriptive error messages**: Exact error location
- [x] **AST validation**: Check for invalid properties (e.g., `gap: -1`)
- [x] **Comment support**: `// comment` or `/* comment */`
- [ ] **Linting**: Validate style and best practices

#### 1.4 Tooling and Developer Experience
- [x] **VS Code extension**: Syntax highlighting, autocomplete, snippets
- [ ] **Prettier plugin**: Automatic formatting of `.iris` files
- [ ] **ESLint plugin**: IRIS code linting
- [ ] **Improved watch mode**: Hot reload in example projects
- [ ] **Source maps**: Map generated JSX back to original IRIS

#### 1.5 Documentation
- [ ] **Migration guide**: How to migrate from other systems
- [ ] **Online playground**: Interactive editor in browser
- [ ] **Step-by-step tutorial**: From zero to first project
- [ ] **Complete API reference**: Documentation of all functions

---

### Phase 2: v0.5 Features (Medium Term)

#### 2.1 Real Components (beyond Skeleton)
- [ ] **Text**: Text component with sizes
- [ ] **Image**: Image placeholder
- [ ] **Button**: Skeleton button
- [ ] **Input**: Input field skeleton
- [ ] **Card**: Pre-built card

#### 2.2 Advanced Layout
- [ ] **Grid**: Basic grid system
- [ ] **Spacer**: Flexible spacing element
- [ ] **Container**: Container with max-width
- [ ] **ScrollView**: Container with scroll

#### 2.3 Multiple Backends (v0.5)
- [ ] **Vue codegen**: Generate Vue 3 components
- [ ] **Svelte codegen**: Generate Svelte components
- [ ] **Pure HTML codegen**: No framework
- [ ] **Native codegen**: React Native / Flutter (future)

#### 2.4 Symbolic Mode
- [ ] **Symbolic variables**: `$spacing`, `$color` for reusable values
- [ ] **Themes**: Basic theme system
- [ ] **Constants**: Define values once, use in multiple places

---

### Phase 3: v1.0 Features (Long Term)

#### 3.1 Logic and Flow
- [ ] **Conditionals**: Basic `if`, `else`
- [ ] **Dynamic loops**: `for` with arrays (not just `Repeat` with fixed count)
- [ ] **Expressions**: Simple calculations (`gap: $spacing * 2`)

#### 3.2 Basic State
- [ ] **Props**: Pass data to components
- [ ] **Local variables**: Simple state
- [ ] **Basic events**: `onClick`, `onChange`

#### 3.3 AI Integration
- [ ] **ChatGPT/Claude plugin**: Direct integration
- [ ] **AI output validation**: Verify if generated code is valid
- [ ] **Automatic suggestions**: AI suggests improvements to IRIS code

#### 3.4 Performance and Optimization
- [ ] **Tree shaking**: Remove unused code
- [ ] **Minification**: Minified JSX for production
- [ ] **Static analysis**: Detect problems before compilation

---

## Immediate Recommendations (Next 2-4 weeks)

### High Priority
1. **Improve generated JSX formatting** - Immediate impact on experience
2. **Add complete padding/margin** - Significantly expands vocabulary
3. **Basic VS Code extension** - Syntax highlighting already helps a lot
4. **Online playground** - Facilitates demonstration and adoption

### Medium Priority
5. **Components beyond Skeleton** - Text, Image, Button
6. **Better error messages** - Facilitates debugging
7. **Comment support** - Improves readability

### Low Priority (but important)
8. **Multiple backends** - Vue, Svelte
9. **Symbolic mode** - Variables and themes
10. **Basic logic** - Conditionals and loops

---

## Visual Roadmap

```
v0 (Current) ✅
  ├─ Basic AST
  ├─ PEG parser
  ├─ React codegen
  └─ Complete tests

v0.5 (Next)
  ├─ Codegen improvements
  ├─ Expanded vocabulary
  ├─ Additional components
  └─ Multiple backends

v1.0 (Future)
  ├─ Logic and flow
  ├─ Basic state
  ├─ AI integration
  └─ Performance
```

---

## Decisions to Make

Before moving forward, consider:

1. **Which backend to prioritize?** Vue? Svelte? Pure HTML?
2. **How to implement symbolic mode?** Preprocessor? Runtime?
3. **What level of logic?** Just conditionals? Or also loops and expressions?
4. **Compatibility**: Maintain compatibility with v0 or allow breaking changes?

---

## Success Metrics

For each phase, define metrics:
- **v0.5**: 90%+ coverage, 3+ backends, 10+ components
- **v1.0**: Functional logic, AI integration, online playground
