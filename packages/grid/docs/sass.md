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

### Breakpoints

### Configuration

#### `$grid-breakpoints`

#### `$grid-gutter`

#### `$grid-gutter--condensed`

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
