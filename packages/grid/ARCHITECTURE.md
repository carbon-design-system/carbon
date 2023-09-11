# Architecture

> Reference document for the approach of buildling and testing this package.

## CSS Grid

The CSS Grid implementation of the IDL Grid is implemented using `display: grid`
but unfortunately is unable to use `grid-gap`, `column-gap`, etc for gutters
because of several requirements we have from the various gutter modes we need to
implement.

In general, our "wide" grid is a grid where each column as 16px of margin on
either side. Our narrow grid, however, will completely drop the leading 16px of
margin. The condensed grid will only have 0.5px of margin on either side of the
column.

Due to this asymmetry, we need to be able to control the leading and trailing
gutter of each cell (both sides are included for right-to-left layouts). We also
need to offer utilities for hanging content "on the grid" or "on a column" so
that elements like text can appropriately align even if the gutter for the cell
is missing.

### Testing

Our CSS Grid implementation has a wide variety of cases to test for, many of
which are in our css-grid preview but should be tested more explicitly in the
future. These ad-hoc tests include verifying:

- The grid definition itself in `$grid-breakpoints` matches the IDL spec
- The grid has the correct number of columns per brekapoint
- The margin of the grid correctly changes between breakpoints
- The various gutter modes work as intended, including
  - Wide
  - Narrow
  - Condensed
- Column span classes have:
  - Classes that apply span unconditionally, regardless of breakpoint
  - Classes that apply conditionally depending on breakpoint
  - Classes that have a span of 0 correctly hide content
- Column offset classes have:
  - Classes that apply span unconditionally, regardless of breakpoint
  - Classes that apply conditionally depending on breakpoint
- Percent-span column classes have:
  - Classes that apply unconditionally
  - Classes that apply conditionally depending on breakpoint
- The different gutter modes interact cleanly in subgrid and support arbitrary
  levels of nesting
- The column hang helper class correctly determines the right amount of margin
  to add in such that text aligns to the grid
- The layouts align correctly in a right-to-left orientation
- The "full width" grid allows the grid to span beyond the max-width of the
  "max" breakpoint
- The grid classes can be used with custom components to align them to the grid
