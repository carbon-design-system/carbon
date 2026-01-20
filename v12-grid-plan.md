# CSS Grid v12 Implementation Plan

## Progress Summary

| Phase                   | Status         | Notes                                                            |
| ----------------------- | -------------- | ---------------------------------------------------------------- |
| **Analysis**            | ✅ Complete    | Current implementation analyzed, v12 approach designed           |
| **Planning**            | ✅ Complete    | Feature flag strategy, noRowGap property, breakpoint adjustments |
| **Feature Flag Setup**  | ⏳ Not Started | Add `enable-css-grid-v12` flag                                   |
| **SCSS Implementation** | ⏳ Not Started | Implement gap-based gutters in @carbon/grid                      |
| **React Components**    | ⏳ Not Started | Add noRowGap prop, integrate feature flag                        |
| **Codemod Development** | ⏳ Not Started | Create automated migration tool                                  |
| **Web Components**      | ⏳ Not Started | Add enable-v12 and no-row-gap attributes                         |
| **Testing**             | ⏳ Not Started | Unit tests, visual regression, integration tests                 |
| **Documentation**       | ⏳ Not Started | Migration guide, API docs, examples                              |
| **Beta Testing**        | ⏳ Not Started | Internal testing with select users                               |
| **Release**             | ⏳ Not Started | Public release with feature flag                                 |

---

## Executive Summary

### Goal

Replace margin-based gutters with CSS `gap` property in Carbon's CSS Grid
implementation, providing a cleaner, more standards-compliant grid system.

### Key Features

- **Gap-based gutters**: Use native CSS `column-gap` and `row-gap` instead of
  margins
- **Optional row gaps**: `noRowGap` property for backward compatibility
- **Feature flag**: `enable-css-grid-v12` for gradual adoption
- **Zero breaking changes**: Existing layouts work with `noRowGap={true}`
- **Column properties unaffected**: Span, offset, start, end work identically

### Benefits

✅ Cleaner CSS implementation  
✅ True grid gaps including rows  
✅ Better alignment with CSS Grid spec  
✅ Simpler mental model  
✅ Easier maintenance

### Challenges

⚠️ Row gaps are a visual change  
⚠️ Padding adjustments at each breakpoint  
⚠️ Migration effort for existing projects  
⚠️ Subgrid compatibility testing needed

---

## Current Implementation (v11)

### How Gutters Work Today

**Location**: `node_modules/@carbon/grid/scss/_css-grid.scss:121-133`

Columns use margin-based gutters:

- Each column has `margin-inline: 16px 16px` (half gutter on each side)
- Grid container has padding to handle outer margins
- No gaps between rows

**Key Variables**:

- `--cds-grid-gutter`: 2rem (32px)
- `--cds-grid-gutter-start`: 1rem (16px)
- `--cds-grid-gutter-end`: 1rem (16px)
- `--cds-grid-gutter-condensed`: 0.0625rem (1px)

**Gutter Modes**:

1. **Wide** (default): 32px gutter
2. **Narrow**: 16px gutter (0px start, 16px end)
3. **Condensed**: 1px gutter

---

## v12 Design

### Core Changes

1. **Use CSS Gap**: Replace column margins with `column-gap` and `row-gap` on
   grid container
2. **Add Row Gaps**: Vertical spacing between rows (new behavior)
3. **Adjust Padding**: Increase grid padding to compensate for removed column
   margins
4. **noRowGap Property**: Optional property to disable row gaps for backward
   compatibility

### Padding Adjustments by Breakpoint

| Breakpoint   | Base Margin | v11 Padding | v12 Padding (Wide) | v12 Padding (Narrow) | v12 Padding (Condensed) |
| ------------ | ----------- | ----------- | ------------------ | -------------------- | ----------------------- |
| sm (320px)   | 0           | 0           | 16px               | 8px                  | 0.5px                   |
| md (672px)   | 16px        | 16px        | 32px               | 24px                 | 16.5px                  |
| lg (1056px)  | 16px        | 16px        | 32px               | 24px                 | 16.5px                  |
| xlg (1312px) | 16px        | 16px        | 32px               | 24px                 | 16.5px                  |
| max (1584px) | 24px        | 24px        | 40px               | 32px                 | 24.5px                  |

**Formula**: `v12-padding = base-margin + (gutter / 2)`

---

## Impact on Column Properties

### ✅ Properties That Work Identically

All column positioning properties work the same in v11 and v12 because they use
CSS Grid's native `grid-column` property:

1. **Span**: `<Column lg={4}>` → `grid-column: span 4 / span 4`
2. **Offset**: `<Column lg={{ span: 4, offset: 2 }}>` → Uses grid line
   positioning
3. **Start**: `<Column lg={{ start: 3 }}>` → `grid-column-start: 3`
4. **End**: `<Column lg={{ end: 7 }}>` → `grid-column-end: 7`

**Why**: Grid lines are independent of how gutters are implemented (margin vs
gap).

### 🆕 What Changes

1. **Gutter implementation**: margin → gap
2. **Row spacing**: None → Optional gaps
3. **Grid padding**: Adjusted at each breakpoint
4. **Column margins**: Removed (gap handles spacing)

---

## Implementation Details

### 1. Feature Flag Setup

#### Add to @carbon/feature-flags

File: `node_modules/@carbon/feature-flags/lib/index.js`

Add after existing flags (around line 100):

```javascript
if (process.env.CARBON_ENABLE_CSS_GRID_V12) {
  if (process.env.CARBON_ENABLE_CSS_GRID_V12 === 'true') {
    enabled$1.enableCssGridV12 = true;
  } else {
    enabled$1.enableCssGridV12 = false;
  }
} else {
  enabled$1.enableCssGridV12 = false;
}
```

#### Add to React

File: `packages/react/src/feature-flags.js`

```javascript
FeatureFlags.merge({
  'enable-css-custom-properties': true,
  'enable-css-grid': true,
  'enable-v11-release': true,
  'enable-css-grid-v12': false,
});
```

### 2. SCSS Implementation

File: `node_modules/@carbon/grid/scss/_css-grid.scss`

Add v12 grid styles after base grid definition (after line 105):

```scss
.#{$prefix}--css-grid--v12 {
  column-gap: var(--cds-grid-gutter);
  row-gap: var(--cds-grid-gutter);
  padding-inline: calc(var(--cds-grid-margin) + var(--cds-grid-gutter) / 2);
  --cds-grid-gutter-start: 0rem;
  --cds-grid-gutter-end: 0rem;
}

.#{$prefix}--css-grid--v12.#{$prefix}--css-grid--no-row-gap {
  row-gap: 0;
}
```

Add v12 column styles (after line 133):

```scss
.#{$prefix}--css-grid--v12 .#{$prefix}--css-grid-column {
  margin-inline: 0;
}
```

Add v12 gutter modes (after line 151):

```scss
.#{$prefix}--css-grid--v12.#{$prefix}--css-grid--narrow {
  column-gap: calc(var(--cds-grid-gutter) / 2);
  row-gap: calc(var(--cds-grid-gutter) / 2);
  padding-inline: calc(var(--cds-grid-margin) + var(--cds-grid-gutter) / 4);
}

.#{$prefix}--css-grid--v12.#{$prefix}--css-grid--condensed {
  column-gap: var(--cds-grid-gutter-condensed);
  row-gap: var(--cds-grid-gutter-condensed);
  padding-inline: calc(
    var(--cds-grid-margin) + var(--cds-grid-gutter-condensed) / 2
  );
}
```

### 3. React Components

#### Update GridTypes.ts

File: `packages/react/src/components/Grid/GridTypes.ts`

Add noRowGap property:

```typescript
export interface GridBaseProps {
  align?: 'start' | 'center' | 'end';
  children?: React.ReactNode;
  className?: string;
  condensed?: boolean;
  fullWidth?: boolean;
  narrow?: boolean;
  noRowGap?: boolean;
}
```

#### Update CSSGrid.tsx

File: `packages/react/src/components/Grid/CSSGrid.tsx`

Add feature flag check and noRowGap prop:

```typescript
const CSSGrid = React.forwardRef(
  (
    {
      align,
      as,
      children,
      className: customClassName,
      condensed = false,
      fullWidth = false,
      narrow = false,
      noRowGap = false,
      ...rest
    },
    ref?
  ) => {
    const prefix = usePrefix();
    const { subgrid } = useGridSettings();
    const enableV12 = useFeatureFlag('enable-css-grid-v12');

    const className = cx(customClassName, {
      [`${prefix}--css-grid`]: true,
      [`${prefix}--css-grid--v12`]: enableV12,
      [`${prefix}--css-grid--condensed`]: mode === 'condensed',
      [`${prefix}--css-grid--narrow`]: mode === 'narrow',
      [`${prefix}--css-grid--full-width`]: fullWidth,
      [`${prefix}--css-grid--no-row-gap`]: enableV12 && noRowGap,
      [`${prefix}--css-grid--start`]: align === 'start',
      [`${prefix}--css-grid--end`]: align === 'end',
    });

    // Rest of component unchanged
  }
);
```

#### Column.tsx - No Changes Needed ✅

### 4. Web Components

#### Update grid.ts

File: `packages/web-components/src/components/grid/grid.ts`

Add properties:

```typescript
@property({ reflect: true, attribute: 'no-row-gap', type: Boolean })
noRowGap = false;

@property({ reflect: true, attribute: 'enable-v12', type: Boolean })
enableV12 = false;
```

#### Update grid.scss

File: `packages/web-components/src/components/grid/grid.scss`

Add v12 selectors:

```scss
:host(#{$prefix}-grid[enable-v12]) [grid] {
  @extend .#{$css-grid}--v12;
}

:host(#{$prefix}-grid[enable-v12][no-row-gap]) [grid] {
  @extend .#{$css-grid}--no-row-gap;
}
```

#### column.ts - No Changes Needed ✅

---

## Usage Examples

### React

```jsx
import { Grid, Column } from '@carbon/react';

// v11 (current)
<Grid>
  <Column lg={4}>Content</Column>
</Grid>

// v12 with backward compatibility
<Grid noRowGap>
  <Column lg={4}>Content</Column>
</Grid>

// v12 with row gaps
<Grid>
  <Column lg={4}>Content</Column>
</Grid>
```

### Web Components

```html
<!-- v11 (current) -->
<cds-grid>
  <cds-column lg="4">Content</cds-column>
</cds-grid>

<!-- v12 with backward compatibility -->
<cds-grid enable-v12 no-row-gap>
  <cds-column lg="4">Content</cds-column>
</cds-grid>

<!-- v12 with row gaps -->
<cds-grid enable-v12>
  <cds-column lg="4">Content</cds-column>
</cds-grid>
```

---

## Testing Strategy

### Unit Tests

Test feature flag behavior, class application, and prop validation.

### Visual Regression Tests

Compare v11 and v12 layouts at all breakpoints.

### Integration Tests

Test nested grids, mixed gutter modes, and complex layouts.

### Browser Compatibility

Test in Chrome, Firefox, Safari, and Edge (latest versions).

---

## Migration Guide

### Step 1: Enable Feature Flag

```javascript
import { enableFeatureFlags } from '@carbon/react';

enableFeatureFlags({
  'enable-css-grid-v12': true,
});
```

### Step 2: Test Existing Layouts

All existing grids work with default behavior (backward compatible).

### Step 3: Opt-in to Row Gaps

Remove `noRowGap` or set to `false` when ready:

````jsx

---

## Automated Migration (Codemod)

### Overview

Following Carbon's established pattern from v10 to v11 migrations, we will provide an automated codemod to help users migrate to v12. The codemod will be part of the `@carbon/upgrade` package and use jscodeshift for intelligent code transformations.

### Codemod Purpose

Unlike previous v12 feature flag codemods (like `enable-v12-tile-default-icons`), the CSS Grid v12 codemod has a **simpler task** because:

1. **No breaking changes by default** - The feature flag alone enables v12 with backward-compatible behavior
2. **Optional migration** - Users can choose when to adopt row gaps
3. **No prop changes required** - Column span, offset, start, end work identically

### What the Codemod Does

The codemod will:

1. **Enable the feature flag globally** in the application
2. **Add `noRowGap` prop to all Grid components** for backward compatibility
3. **Add necessary imports** if not already present
4. **Preserve existing Grid props** (condensed, narrow, fullWidth, etc.)

### Codemod Implementation

**File**: `packages/upgrade/transforms/enable-v12-css-grid.js`

```javascript
/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Migrate Grid components to v12 by adding noRowGap prop
 * and enabling the feature flag
 */

'use strict';

const defaultOptions = {
  quote: 'single',
  trailingComma: true,
};

function transform(fileInfo, api, options) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  const printOptions = options.printOptions || defaultOptions;

  // Early return if no Grid components found
  const hasGrid = root.find(j.JSXElement, {
    openingElement: { name: { name: 'Grid' } }
  }).size() > 0;

  if (!hasGrid) {
    return null;
  }

  let modified = false;

  // Add noRowGap prop to all Grid components
  root
    .find(j.JSXElement, {
      openingElement: { name: { name: 'Grid' } }
    })
    .forEach((path) => {
      const attributes = path.node.openingElement.attributes;

      // Check if noRowGap already exists
      const hasNoRowGap = attributes.some(
        (attr) =>
          attr.type === 'JSXAttribute' &&
          attr.name.name === 'noRowGap'
      );

      // Add noRowGap={true} for backward compatibility
      if (!hasNoRowGap) {
        attributes.push(
          j.jsxAttribute(
            j.jsxIdentifier('noRowGap'),
            j.jsxExpressionContainer(j.booleanLiteral(true))
          )
        );
        modified = true;
      }
    });

  if (!modified) {
    return null;
  }

  return root.toSource(printOptions);
}

module.exports = transform;
module.exports.parser = 'tsx';
````

### Usage

```bash
# Run the codemod on your source files
npx @carbon/upgrade migrate enable-v12-css-grid src/**/*.{js,jsx,ts,tsx} --write

# Or run on specific directories
npx @carbon/upgrade migrate enable-v12-css-grid src/components --write
```

### Before and After Examples

#### Example 1: Basic Grid

**Before:**

```jsx
import { Grid, Column } from '@carbon/react';

function MyLayout() {
  return (
    <Grid>
      <Column lg={4}>Content</Column>
      <Column lg={4}>Content</Column>
    </Grid>
  );
}
```

**After (codemod applied):**

```jsx
import { Grid, Column } from '@carbon/react';

function MyLayout() {
  return (
    <Grid noRowGap={true}>
      <Column lg={4}>Content</Column>
      <Column lg={4}>Content</Column>
    </Grid>
  );
}
```

#### Example 2: Grid with Existing Props

**Before:**

```jsx
<Grid condensed fullWidth>
  <Column lg={8}>Content</Column>
</Grid>
```

**After (codemod applied):**

```jsx
<Grid condensed fullWidth noRowGap={true}>
  <Column lg={8}>Content</Column>
</Grid>
```

#### Example 3: Already Has noRowGap

**Before:**

```jsx
<Grid noRowGap={false}>
  <Column lg={4}>Content</Column>
</Grid>
```

**After (codemod applied):**

```jsx
// No changes - already has noRowGap prop
<Grid noRowGap={false}>
  <Column lg={4}>Content</Column>
</Grid>
```

### Codemod Test Fixtures

**File**:
`packages/upgrade/transforms/__testfixtures__/enable-v12-css-grid.input.js`

```jsx
import { Grid, Column } from '@carbon/react';

// Test 1: Basic Grid
function Test1() {
  return (
    <Grid>
      <Column lg={4}>Content</Column>
    </Grid>
  );
}

// Test 2: Grid with props
function Test2() {
  return (
    <Grid condensed narrow>
      <Column lg={8}>Content</Column>
    </Grid>
  );
}

// Test 3: Already has noRowGap
function Test3() {
  return (
    <Grid noRowGap={false}>
      <Column lg={4}>Content</Column>
    </Grid>
  );
}

// Test 4: Nested Grids
function Test4() {
  return (
    <Grid>
      <Column lg={8}>
        <Grid>
          <Column lg={4}>Nested</Column>
        </Grid>
      </Column>
    </Grid>
  );
}
```

**File**:
`packages/upgrade/transforms/__testfixtures__/enable-v12-css-grid.output.js`

```jsx
import { Grid, Column } from '@carbon/react';

// Test 1: Basic Grid
function Test1() {
  return (
    <Grid noRowGap={true}>
      <Column lg={4}>Content</Column>
    </Grid>
  );
}

// Test 2: Grid with props
function Test2() {
  return (
    <Grid condensed narrow noRowGap={true}>
      <Column lg={8}>Content</Column>
    </Grid>
  );
}

// Test 3: Already has noRowGap
function Test3() {
  return (
    <Grid noRowGap={false}>
      <Column lg={4}>Content</Column>
    </Grid>
  );
}

// Test 4: Nested Grids
function Test4() {
  return (
    <Grid noRowGap={true}>
      <Column lg={8}>
        <Grid noRowGap={true}>
          <Column lg={4}>Nested</Column>
        </Grid>
      </Column>
    </Grid>
  );
}
```

### Feature Flag Enablement

After running the codemod, users need to enable the feature flag:

**Option 1: Global enablement**

```javascript
// In your app's entry point (e.g., index.js, App.js)
import { enableFeatureFlags } from '@carbon/react';

enableFeatureFlags({
  'enable-css-grid-v12': true,
});
```

**Option 2: Environment variable**

```bash
# .env file
CARBON_ENABLE_CSS_GRID_V12=true
```

### Manual Migration Steps (Post-Codemod)

After running the codemod, users can gradually opt-in to row gaps:

1. **Test the layout** with `noRowGap={true}` (backward compatible)
2. **Review designs** to determine if row gaps improve the layout
3. **Remove `noRowGap` prop** or set to `false` to enable row gaps
4. **Adjust spacing** in components if needed

### Codemod Limitations

The codemod **does not**:

- Modify Web Components (they use attributes, not props)
- Change SCSS or CSS files
- Adjust component spacing automatically
- Make design decisions about row gaps

Users will need to:

- Manually update Web Components: `<cds-grid enable-v12 no-row-gap>`
- Review and test layouts after migration
- Decide when to enable row gaps per-grid

### Documentation Updates

Add to `packages/upgrade/README.md`:

````markdown
### Enable v12 CSS Grid

Migrates Grid components to use v12 gap-based gutters with backward
compatibility.

**Usage:**

```bash
npx @carbon/upgrade migrate enable-v12-css-grid src/**/*.{js,jsx,ts,tsx} --write
```
````

This codemod:

- Adds `noRowGap={true}` to all Grid components for backward compatibility
- Preserves existing Grid props (condensed, narrow, fullWidth, etc.)
- Does not modify Column components (they work identically in v12)

**After running the codemod:**

1. Enable the feature flag in your application:

   ```javascript
   import { enableFeatureFlags } from '@carbon/react';

   enableFeatureFlags({
     'enable-css-grid-v12': true,
   });
   ```

2. Test your layouts with `noRowGap={true}` (backward compatible)

3. Gradually remove `noRowGap` or set to `false` to adopt row gaps:
   ```jsx
   // Enable row gaps when ready
   <Grid noRowGap={false}>
     <Column lg={4}>Content</Column>
   </Grid>
   ```

**Example:**

Before:

```jsx
<Grid condensed>
  <Column lg={4}>Content</Column>
</Grid>
```

After:

```jsx
<Grid condensed noRowGap={true}>
  <Column lg={4}>Content</Column>
</Grid>
```

```

### Why This Approach?

1. **Follows Carbon patterns** - Similar to other v12 feature flag codemods
2. **Zero breaking changes** - All layouts work identically after codemod
3. **Gradual adoption** - Users control when to enable row gaps
4. **Automated** - Reduces manual migration effort
5. **Testable** - Test fixtures ensure predictable transformations
6. **Reversible** - Users can easily revert by removing the prop

### Alternative: No Codemod Approach

If a codemod is deemed unnecessary, users can:

1. **Enable feature flag** globally
2. **Manually add `noRowGap`** to grids that need it
3. **Test and adjust** layouts as needed

This approach is simpler but requires more manual work for large codebases.

### Recommendation

**Provide the codemod** because:
- Large codebases may have hundreds of Grid components
- Automated migration reduces errors
- Follows established Carbon migration patterns
- Provides confidence through test fixtures
- Users can still manually migrate if preferred

<Grid noRowGap={false}>
  <Column lg={4}>Content</Column>
</Grid>
```

### Step 4: Adjust Layouts if Needed

Use `noRowGap` temporarily or adjust spacing in components.

---

## Timeline

- **Week 1-2**: Foundation (feature flag, SCSS)
- **Week 3-4**: React implementation
- **Week 5-6**: Web Components implementation
- **Week 7**: Documentation
- **Week 8-10**: Beta testing
- **Week 11-12**: Release

---

## Files to Modify

### Core

- `node_modules/@carbon/feature-flags/lib/index.js`
- `node_modules/@carbon/grid/scss/_css-grid.scss`
- `packages/react/src/feature-flags.js`

### React

- `packages/react/src/components/Grid/GridTypes.ts`
- `packages/react/src/components/Grid/CSSGrid.tsx`

### Web Components

- `packages/web-components/src/components/grid/grid.ts`
- `packages/web-components/src/components/grid/grid.scss`

### Tests

- `packages/react/src/components/Grid/__tests__/Grid-test.js`
- `packages/web-components/src/components/grid/__tests__/grid-test.ts`

### Documentation

- Create migration guide
- Update API documentation
- Add code examples

---

## Key Takeaways

✅ **Column properties unaffected** - Span, offset, start, end work
identically  
✅ **Backward compatible** - noRowGap property prevents breaking changes  
✅ **Same approach for React and Web Components** - Both use same SCSS
foundation  
✅ **Gradual adoption** - Feature flag allows testing before full rollout  
✅ **Cleaner implementation** - Gap-based gutters are more maintainable

---

**Last Updated**: 2026-01-20  
**Version**: 1.0  
**Status**: Planning Complete, Ready for Implementation
