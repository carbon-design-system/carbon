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

## Usage

_More examples and documentation can be found on this
[live demo website](https://carbon-elements.netlify.com/grid/examples/preview/)._

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

## Experimental CSS Grid Usage

_More examples and documentation can be found on this
[live demo website](https://carbon-elements.netlify.com/grid/examples/css-grid/)._

There is an experimental implementation of the Grid built using CSS Grid instead
of flexbox. This implementation ships with a 16 column grid.

`@carbon/grid` has two primitive class types to use in order to structure your
application. They include:

- `.#{$prefix}--css-grid` - defines the overall grid context and sets some
  useful attributes like width and margin
- `.#{$prefix}--col-span-*` - used to define individual columns

You can use a combination of these classes to build a layout. For example, if we
wanted a 4 column layout we could use the following markup:

```html
<div class="cds--css-grid">
  <div class="cds--col-span-4"></div>
  <div class="cds--col-span-4"></div>
  <div class="cds--col-span-4"></div>
  <div class="cds--col-span-4"></div>
</div>
```

While this layout can work for some grid usage scenarios, we probably will want
more control over how many columns our layout will span at each given
breakpoint.

By default, this uses the breakpoints defined in `@carbon/grid`. There are five
breakpoints: `sm`, `md`, `lg`, `xlg`, and `max`. You can use each one in
combination with a column to specify the number of columns to span at a given
breakpoint. For example, if we wanted four columns to change widths or be hidden
at various breakpoints we could use the following markup:

```html
<div class="cds--css-grid">
  <div class="cds--sm:col-span-2 cds--md:col-span-4 cds--lg:col-span-6">
    <p>Small: Span 2 of 4</p>
    <p>Medium: Span 4 of 8</p>
    <p>Large: Span 6 of 16</p>
  </div>
  <div class="cds--sm:col-span-2 cds--md:col-span-2 cds--lg:col-span-3">
    <p>Small: Span 2 of 4</p>
    <p>Medium: Span 2 of 8</p>
    <p>Large: Span 3 of 16</p>
  </div>
  <div class="cds--sm:col-span-0 cds--md:col-span-2 cds--lg:col-span-3">
    <p>Small: Span 0 of 4</p>
    <p>Medium: Span 2 of 8</p>
    <p>Large: Span 3 of 16</p>
  </div>
  <div class="cds--sm:col-span-0 cds--md:col-span-0 cds--lg:col-span-4">
    <p>Small: Span 0 of 4</p>
    <p>Medium: Span 0 of 8</p>
    <p>Large: Span 4 of 16</p>
  </div>
</div>
```

The `.cds--sm:col-span-2` class names tells us that this `<div>` should only
span two columns at our `sm` breakpoint.

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
