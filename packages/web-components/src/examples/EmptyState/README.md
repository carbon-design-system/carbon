# EmptyState — Pattern Example

> **What is a Pattern Example?**
> Unlike components exported from `@carbon/web-components`, pattern examples are
> _copy-and-customize_ recipes — not a published package export.
> Copy this folder into your own codebase and adapt it to fit your needs.

## What is included

| File | Purpose |
|------|---------|
| `empty-state-example.ts` | Full UI Shell page with three empty-state placements |
| `empty-state-example.scss` | Layout styles for the example (prefixed `es-example__`) |
| `assets/` | SVG illustrations referenced by the example |
| `index.ts` | Re-exports `CDSEmptyStateExample` for use in stories |

## How to use

1. **Copy** this folder (`src/examples/EmptyState/`) into your project.

2. **Install** the required peer dependencies if you haven't already:

   ```bash
   npm install @carbon/web-components
   # or
   yarn add @carbon/web-components
   ```

3. **Update imports** — the file uses monorepo-relative paths internally.
   In your own app, replace `../../components/X` with `@carbon/web-components`:

   ```ts
   import '@carbon/web-components/es/components/empty-state/index.js';
   import '@carbon/web-components/es/components/data-table/index.js';
   // etc.
   ```

4. **Register and use** the custom element:

   ```html
   <script type="module">
     import './empty-state-example.js';
   </script>

   <!-- Left-aligned (default) -->
   <cds-empty-state-example></cds-empty-state-example>

   <!-- Centred -->
   <cds-empty-state-example placement="centre"></cds-empty-state-example>
   ```

5. **Customize** — the file is yours. Swap the illustrations, change the copy,
   remove sections you don't need, or split the individual placements into
   their own components.

## Empty-state placements demonstrated

### 1 — DataTable: no search results

When a search returns zero rows the `<cds-empty-state>` appears inline inside
the table, replacing the empty table body.

```html
<cds-empty-state
  illustration-src="./assets/not-found.svg"
  heading="No results match the current search"
  subtitle="Clear the search field or try a different term."
  action-text="Clear search"
  action-kind="tertiary">
</cds-empty-state>
```

### 2 — Tile: vertical (centred in remaining height)

A tall, narrow tile where the empty state is vertically centred within the
space below the tile header.

```html
<cds-empty-state
  size="sm"
  illustration-src="./assets/error.svg"
  heading="This insight is unavailable"
  subtitle="Try loading the page once again after adding an asset."
  link-text="Learn more"
  link-href="https://carbondesignsystem.com/patterns/empty-states-pattern/">
</cds-empty-state>
```

### 3 — Tile: horizontal (anchored at the top)

A wide, short tile where the empty state sits at the natural start of the
content area.

```html
<cds-empty-state
  size="sm"
  illustration-src="./assets/unauthorized.svg"
  heading="You do not have access"
  subtitle="Request view access from your admin."
  action-text="Request access"
  action-kind="tertiary">
</cds-empty-state>
```

## Alignment

Set `placement="centre"` to centre every empty state within its container.
The default is `'left'` (start-aligned).

## Illustrations

The `assets/` folder contains five SVG illustrations. You can swap any of them
for any image URL via the `illustration-src` attribute, or place a custom SVG
element in the `illustration` slot instead:

```html
<cds-empty-state heading="No data">
  <svg slot="illustration" ...></svg>
</cds-empty-state>
```

Refer to [`cds-empty-state`](../../components/empty-state/empty-state.ts)
for full attribute documentation.
