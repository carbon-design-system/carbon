# Migrate grid to 8.x

To get a sense of what's changed in the grid implementation, read through the
[`@carbon/grid` migration documentation](docs/migration/11.x-grid.md). The most
notable item to mention is that the implementation uses CSS Grid instead of
flexbox.

## `<Grid>`

- The prop interface for `<Grid>` is primarily the same.
- When a `<Grid>` is a child of another `<Grid>`, the child will always be
  automatically defined as a subgrid. More info can be found in the subgrid
  story in the `@carbon/react` storybook.
- The grid now defaults to 16 columns instead of 12.

## `<Row>`

- This has been removed. Columns can now be direct children of a `<Grid>`.

## `<Column>`

- The prop interface for `<Grid>` is primarily the same.
- `<Column>` components without a `sm`, `md`, `lg`, etc. prop no longer
  automatically expand to fill the remaining space of the grid. `<Column>` by
  default spans only 1 column on the grid.
