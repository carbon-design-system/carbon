# @carbon/grid

> Grid for digital and software products using the Carbon Design System

## Getting started

To install `@carbon/grid` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/grid
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/grid
```

You can then include the grid by doing the following in your Sass files:

```
@use '@carbon/grid';

// Emit the flex-grid styles
@include grid.flex-grid();
```

## Usage

_More examples and documentation can be found on this
[live demo website](https://carbon-elements.netlify.com/grid/examples/preview/)._

`@carbon/grid` has three primitive class types to use in order to structure your
application. They include:

- `cds--grid`, defines the overall grid context and sets some useful attributes
  like width and margin
- `cds--row`, defines a row of items in a grid
- `cds--col`, used to define individual columns

You can use a combination of these classes to build a layout. For example, if we
wanted a 4 column layout for a small breakpoint we could use the following
markup:

```html
<div class="cds--grid">
  <div class="cds--row">
    <div class="cds--col">1/4</div>
    <div class="cds--col">1/4</div>
    <div class="cds--col">1/4</div>
    <div class="cds--col">1/4</div>
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
<div class="cds--grid">
  <div class="cds--row">
    <div class="cds--col-sm-1">1/4</div>
    <div class="cds--col-sm-1">1/4</div>
    <div class="cds--col-sm-1">1/4</div>
    <div class="cds--col-sm-1">1/4</div>
  </div>
</div>
```

The `.cds--col-sm-1` class names tells us that this `<div>` should only span one
column at our `sm` breakpoint. By default, as we scale beyond the breakpoint the
layout will still take up a percentage of the overall width.

## 📚 Examples

If you're looking for more examples on how to use `@carbon/grid`, we have some
examples that you can check out:

- [css-grid](./examples/css-grid)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
