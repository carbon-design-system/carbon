# Sass

> Sass documentation for `@carbon/grid`

## Usage

The `@carbon/grid` package ships CSS Grid and Flexbox-based grids, along with
grid utilities, for the IBM Design Language in Sass. You can import and use the
grid by writing the following:

```scss
@use '@carbon/grid';
```

- Changing grid columns
- Customizing the grid
- Subgrid support
- Breakpoint helpers
- Configuration
  - prefix
  - `$grid-gutter`
  - `$grid-gutter--condensed`
  - `$grid-breakpoints`

### Classes

| Name                                       | Description                                            |
| :----------------------------------------- | :----------------------------------------------------- |
| `cds--css-grid`                            | Grid class name                                        |
| `cds--css-grid-column`                     | Column class name                                      |
| `cds--col-span-{0,16}`                     | Unconditional column span                              |
| `cds--{sm,md,lg,xlg,max}:col-span-{0,16}`  | Responsive column span                                 |
| `cds--col-span-{25,50,75,100}`             | Percent column span across breakpoints                 |
| `cds--col-start-{1,16}`                    | Unconditional column start                             |
| `cds--{sm,md,lg,xlg,max}:col-start-{1,16}` | Responsive column start                                |
| `cds--col-end-{2,17}`                      | Unconditional column end                               |
| `cds--{sm,md,lg,xlg,max}:col-end-{2,17}`   | Responsive column end                                  |
| `cds--col-gutter`                          | Add the grid gutter to an HTML element                 |
| `cds--col-gutter-{start,end}`              | Add the grid gutter start/end value to an HTML element |
| `cds--grid-column-hang`                    |                                                        |

### Breakpoints

### Configuration

#### `$grid-breakpoints`

#### `$grid-gutter`

#### `$grid-gutter-condensed`

## API

| Name                     | Description                                                                         | Type        | Default |
| :----------------------- | :---------------------------------------------------------------------------------- | :---------- | :------ |
| `breakpoint-next`        | Get the value of the next breakpoint                                                | `@function` |         |
| `breakpoint-prev`        | Get the value of the previous breakpoint                                            | `@function` |         |
| `is-smallest-breakpoint` | Check to see if the given breakpoint is the smallest breakpoint                     | `@function` |         |
| `is-largest-breakpoint`  | Check to see if the given breakpoint is the largest breakpoint                      | `@function` |         |
| `breakpoint-up`          | Generate a media query from the width of the given breakpoint to infinity           | `@mixin`    |         |
| `breakpoint-down`        | Generate a media query that applies below the maximum width of the given breakpoint | `@mixin`    |         |
| `breakpoint-between`     | Generate a media query for the range between the lower and upper breakpoints        | `@mixin`    |         |
| `largest-breakpoint`     | Generate a media query for the largest breakpoint                                   | `@mixin`    |         |
| `breakpoint`             | Generate a media query for a given breakpoint, alias of `breakpoint-up`             | `@mixin`    |         |
