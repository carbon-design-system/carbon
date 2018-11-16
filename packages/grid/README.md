# `@carbon/grid`

> Grid for digital and software products using the Carbon Design System.

## Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/grid
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/grid
```

## Usage

`@carbon/grid` has three primitive class types to use in order to structure your
application. They include:

- `bx--grid`, defines the overall grid context and sets some useful attributes
  like width and margin
- `bx--row`, defines a row of items in a grid
- `bx--col`, used to define individual columns

You can use a combination of these classes to build a layout. For example, if we
wanted a 4 column layout for a small breakpoint we could use the following
markup:

```html
<div class="bx--grid">
  <div class="bx--row">
    <div class="bx--col">1/4</div>
    <div class="bx--col">1/4</div>
    <div class="bx--col">1/4</div>
    <div class="bx--col">1/4</div>
  </div>
</div>
```

While this layout can work for some grid usage scenarios, we probably will want
more control over how many columns our layout will span at each given
breakpoint.

By default, `@carbon/grid` uses the breakpoints defined in `@carbon/layout`.
There are five breakpoints: `sm`, `md`, `lg`, `xlg`, and `max`. You can use each
one in combination with a column to specify the number of columns to span at a
given breakpoint. For example, we could rewrite the above example to be:

```html
<div class="bx--grid">
  <div class="bx--row">
    <div class="bx--col-sm-1">1/4</div>
    <div class="bx--col-sm-1">1/4</div>
    <div class="bx--col-sm-1">1/4</div>
    <div class="bx--col-sm-1">1/4</div>
  </div>
</div>
```

The `.bx--col-sm-1` class names tells us that this `<div>` should only span one
column at our `sm` breakpoint. By default, as we scale beyond the breakpoint the
layout will still take up a percentage of the overall width.

## Class reference

| Class name                        | Description                                                                                                 |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `.bx--grid`                       | Use at the top-level of your project to define a grid for a section of the page                             |
| `.bx--grid--bleed`                | Collapse all the gutters in the layout. Useful alongside `.bx--grid--padding`                               |
| `.bx--grid--padding`              | Apply padding to the content of every column in the layout                                                  |
| `.bx--grid--hang`                 | Tell the grid to drop the left (or right) gutter from the overall layout. Useful for hanging type           |
| `.bx--row`                        | Define a row inside of a grid.                                                                              |
| `.bx--col`, `.bx--col--auto`      | Define a column that spans as much width as available                                                       |
| `.bx--col-<breakpoint>-<span>`    | Define a column at a breakpoint that spans the given number of columns                                      |
| `.bx--offset-<breakpoint>-<span>` | Define an column at a breakpoint that spans the given number of columns. Can be used on a non-empty column. |

## 🤲 Contributing

To learn more about how to contribute, look [here](/.github/CONTRIBUTING.md)!
