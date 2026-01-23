# CSS Grid v12 Migration Guide

## Overview

CSS Grid v12 introduces gap-based gutters using native CSS `column-gap` and
`row-gap` properties, replacing the previous margin-based approach. This
provides a cleaner, more standards-compliant grid system with optional row
spacing.

## What's New

### Gap-Based Gutters

- **Column gaps**: Uses `column-gap` instead of column margins
- **Row gaps**: Adds vertical spacing between rows (new feature)
- **Cleaner CSS**: Simpler implementation aligned with CSS Grid spec

### Backward Compatibility

- **Feature flag**: `enable-css-grid-v12` (disabled by default)
- **noRowGap prop**: Disables row gaps for layouts that need v11 behavior
- **Zero breaking changes**: Existing layouts work with `noRowGap={true}`

## Migration Steps

### Step 1: Enable the Feature Flag

Add the feature flag to your application's entry point:

```javascript
import { enableFeatureFlags } from '@carbon/react';

enableFeatureFlags({
  'enable-css-grid-v12': true,
});
```

Or use an environment variable:

```bash
# .env file
CARBON_ENABLE_CSS_GRID_V12=true
```

### Step 2: Run the Automated Codemod

The codemod adds `noRowGap={true}` to all Grid components for backward
compatibility:

```bash
npx @carbon/upgrade migrate enable-v12-css-grid src/**/*.{js,jsx,ts,tsx} --write
```

**What the codemod does:**

- Finds all `<Grid>` components
- Adds `noRowGap={true}` prop (unless already present)
- Preserves all existing props (condensed, narrow, fullWidth, etc.)
- Does not modify Column components (they work identically)

**Before:**

```jsx
<Grid condensed>
  <Column lg={4}>Content</Column>
</Grid>
```

**After:**

```jsx
<Grid condensed noRowGap={true}>
  <Column lg={4}>Content</Column>
</Grid>
```

### Step 3: Test Your Layouts

With `noRowGap={true}`, your layouts should look identical to v11:

- Same column spacing
- No row gaps (backward compatible)
- All column properties work the same (span, offset, start, end)

### Step 4: Gradually Adopt Row Gaps

When ready, remove `noRowGap` or set it to `false` to enable row gaps:

```jsx
// Enable row gaps
<Grid>
  <Column lg={4}>Content</Column>
  <Column lg={4}>Content</Column>
</Grid>

// Or explicitly
<Grid noRowGap={false}>
  <Column lg={4}>Content</Column>
</Grid>
```

## API Changes

### React Components

#### Grid Component

**New Props:**

- `noRowGap?: boolean` - Disables row gaps when true (default: false)

**Example:**

```jsx
import { Grid, Column } from '@carbon/react';

// v12 with row gaps (new default when flag is enabled)
<Grid>
  <Column lg={4}>Content</Column>
</Grid>

// v12 without row gaps (backward compatible)
<Grid noRowGap>
  <Column lg={4}>Content</Column>
</Grid>
```

### Web Components

#### cds-grid Element

**New Attributes:**

- `enable-v12` - Enables v12 gap-based gutters
- `no-row-gap` - Disables row gaps when present

**Example:**

```html
<!-- v12 with row gaps -->
<cds-grid enable-v12>
  <cds-column lg="4">Content</cds-column>
</cds-grid>

<!-- v12 without row gaps (backward compatible) -->
<cds-grid enable-v12 no-row-gap>
  <cds-column lg="4">Content</cds-column>
</cds-grid>
```

## Technical Details

### What Changed

#### v11 (Margin-Based)

- Columns have `margin-inline: 16px 16px` (half gutter on each side)
- Grid container has padding to handle outer margins
- No gaps between rows

#### v12 (Gap-Based)

- Grid container uses `column-gap` and `row-gap`
- Columns have no margins (gap handles spacing)
- Grid padding adjusted to compensate: `padding = base-margin + (gutter / 2)`
- Optional row gaps between rows

### Padding Adjustments by Breakpoint

In v12, the grid container's left and right padding is adjusted to maintain
consistent spacing while using gap-based gutters. The spacing comes from a
combination of the original v11 margin and additional padding.

**Wide Mode (default):**

- **sm-md breakpoints**: 16px left and right
  - This was part of the v11 margin (half-gutter)
- **md-lg breakpoints**: 32px left and right
  - 16px from v11 margin + 16px additional padding
- **xlg+ breakpoints**: 40px left and right
  - 24px from v11 margin + 16px additional padding

**Narrow Mode:**

- Removes 16px from the left side of each column
- Takes precedence over Condensed when both are applied

**Condensed Mode:**

- Removes all the space that was added by the v11 margins
- Results in minimal spacing at the grid edges

### Column Properties (Unchanged)

All column positioning properties work identically in v11 and v12:

- **Span**: `<Column lg={4}>` → `grid-column: span 4 / span 4`
- **Offset**: `<Column lg={{ span: 4, offset: 2 }}>` → Uses grid line
  positioning
- **Start**: `<Column lg={{ start: 3 }}>` → `grid-column-start: 3`
- **End**: `<Column lg={{ end: 7 }}>` → `grid-column-end: 7`

## Common Scenarios

### Nested Grids

Nested grids work the same way. Apply `noRowGap` to each grid independently:

```jsx
<Grid noRowGap>
  <Column lg={8}>
    <Grid noRowGap>
      <Column lg={4}>Nested content</Column>
    </Grid>
  </Column>
</Grid>
```

### Mixed Layouts

You can mix grids with and without row gaps in the same application:

```jsx
// Header: no row gaps
<Grid noRowGap>
  <Column lg={16}>Header</Column>
</Grid>

// Content: with row gaps
<Grid>
  <Column lg={4}>Card 1</Column>
  <Column lg={4}>Card 2</Column>
  <Column lg={4}>Card 3</Column>
  <Column lg={4}>Card 4</Column>
</Grid>
```

### Gutter Modes

All gutter modes work with v12:

```jsx
// Wide (default): 32px gaps
<Grid>
  <Column lg={4}>Content</Column>
</Grid>

// Narrow: 16px column gap, 0px start gutter
<Grid narrow>
  <Column lg={4}>Content</Column>
</Grid>

// Condensed: 1px gaps
<Grid condensed>
  <Column lg={4}>Content</Column>
</Grid>
```

## Troubleshooting

### Layout looks different after migration

**Solution**: Ensure `noRowGap={true}` is applied to all grids. The codemod
should handle this automatically.

### Row gaps are too large/small

**Solution**: Row gaps match column gaps by default. Use `noRowGap` to disable
them, or adjust your layout spacing.

### TypeScript errors about noRowGap

**Solution**: Rebuild your project after updating Carbon. The types should
include the new property.

```bash
yarn build
# or
npm run build
```

## Benefits of v12

✅ **Cleaner CSS** - Uses native CSS Grid gap properties  
✅ **True grid gaps** - Includes row spacing, not just columns  
✅ **Better alignment** - Follows CSS Grid specification  
✅ **Simpler mental model** - Gap-based spacing is more intuitive  
✅ **Easier maintenance** - Less complex CSS calculations

## Support

For questions or issues:

- [Carbon Design System GitHub](https://github.com/carbon-design-system/carbon)
- [Carbon Design System Slack](https://www.carbondesignsystem.com/help/support/)

## Version History

- **v12.0.0** - Initial release of gap-based CSS Grid
- Feature flag: `enable-css-grid-v12`
