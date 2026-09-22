# EmptyState — Pattern Example

> **What is a Pattern Example?**
> Unlike components exported from `@carbon/react`, pattern examples are
> _copy-and-customize_ recipes — not a published package export.
> Copy this folder into your own codebase and adapt it to fit your needs.

## What is included

| File | Purpose |
|------|---------|
| `EmptyState.tsx` | Full UI Shell page with three empty-state placements |
| `EmptyState.scss` | Layout styles for the example (prefixed `es-example__`) |
| `assets/` | SVG illustrations referenced by the example |
| `index.ts` | Re-exports `EmptyStateExample` for use in stories |

## How to use

1. **Copy** this folder (`src/examples/EmptyState/`) into your project.

2. **Install** the required peer dependencies if you haven't already:

   ```bash
   npm install @carbon/react @carbon/icons-react
   # or
   yarn add @carbon/react @carbon/icons-react
   ```

3. **Update imports** — the file uses monorepo-relative paths internally.
   In your own app, replace `../../components/X` with `@carbon/react`:

   ```tsx
   import { Button, EmptyState, Grid, ... } from '@carbon/react';
   ```

4. **Import** the component wherever you need it:

   ```tsx
   import { EmptyStateExample } from './EmptyState';

   // Left-aligned (default)
   <EmptyStateExample />

   // Centred
   <EmptyStateExample placement="centre" />
   ```

5. **Customize** — the file is yours. Swap the illustrations, change the copy,
   remove sections you don't need, or split the individual placements into
   their own components.


Refer to the [`EmptyState` component props](../../components/EmptyState/EmptyState.tsx)
for full documentation of the `illustration` prop.
