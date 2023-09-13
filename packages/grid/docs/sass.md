# Sass

> Sass documentation for `@carbon/grid`

## Usage

The `@carbon/grid` package ships CSS Grid and Flexbox-based grids, along with
grid utilities, for the IBM Design Language in Sass. You can import and use the
grid by writing the following:

```scss
@use '@carbon/grid';

// Emit all the CSS for the CSS Grid
@include grid.css-grid();
```

With the CSS for CSS Grid, you can create a grid in your HTML by writing the
following:

```html
<div class="cds--css-grid">
  <div class="cds--css-grid-column cds--col-span-4">Span 4 columns</div>
  <div class="cds--css-grid-column cds--col-span-2">Span 2 columns</div>
</div>
```

There is also support for responsive classes that are included with the
`css-grid` mixin. These responsive classes allow you to do the following for
each breakpoint:

- Change how many columns your content spans based on content
- Hide or show content depending on the breakpoint
- Change where your columns start or end

For a full list of classes available, checkout the [classes](#classes) section
below.

### Classes

| Name                                       | Description                            |
| :----------------------------------------- | :------------------------------------- |
| `cds--css-grid`                            | Grid class name                        |
| `cds--css-grid-column`                     | Column class name                      |
| `cds--col-span-{0,16}`                     | Unconditional column span              |
| `cds--{sm,md,lg,xlg,max}:col-span-{0,16}`  | Responsive column span                 |
| `cds--col-span-{25,50,75,100}`             | Percent column span across breakpoints |
| `cds--col-start-{1,16}`                    | Unconditional column start             |
| `cds--{sm,md,lg,xlg,max}:col-start-{1,16}` | Responsive column start                |
| `cds--col-end-{2,17}`                      | Unconditional column end               |
| `cds--{sm,md,lg,xlg,max}:col-end-{2,17}`   | Responsive column end                  |
| `cds--grid-column-hang`                    | Hang content on a grid column          |
| `cds--subgrid`                             | Specify an element as a subgrid        |
| `cds--subgrid--{wide,narrow,condensed}`    | Specify the gutter mode of subgrid     |

## API

| Name                     | Description                                                                         | Type        | Default       |
| :----------------------- | :---------------------------------------------------------------------------------- | :---------- | :------------ |
| `css-grid`               | Generate the CSS for using the CSS Grid                                             | `@mixin`    |               |
| `$prefix`                | Specify the prefix used for CSS selectors                                           | `String`    | `'cds'`       |
| `$flex-grid-columns`     | Specify the number of columns for the flex grid                                     | `Number`    | `16`          |
| `$grid-gutter`           | Specify the gutter of the grid                                                      | `Number`    | `32px (2rem)` |
| `$grid-gutter-condensed` | Specify the gutter of the condensed grid                                            | `Number`    | `1px`         |
| `$grid-breakpoints`      | Specify the breakpoints for the grid                                                | `Map`       |               |
| `breakpoint-next`        | Get the value of the next breakpoint                                                | `@function` |               |
| `breakpoint-prev`        | Get the value of the previous breakpoint                                            | `@function` |               |
| `is-smallest-breakpoint` | Check to see if the given breakpoint is the smallest breakpoint                     | `@function` |               |
| `is-largest-breakpoint`  | Check to see if the given breakpoint is the largest breakpoint                      | `@function` |               |
| `breakpoint-up`          | Generate a media query from the width of the given breakpoint to infinity           | `@mixin`    |               |
| `breakpoint-down`        | Generate a media query that applies below the maximum width of the given breakpoint | `@mixin`    |               |
| `breakpoint-between`     | Generate a media query for the range between the lower and upper breakpoints        | `@mixin`    |               |
| `largest-breakpoint`     | Generate a media query for the largest breakpoint                                   | `@mixin`    |               |
| `breakpoint`             | Generate a media query for a given breakpoint, alias of `breakpoint-up`             | `@mixin`    |               |
