# @carbon/pictograms-react

> React components for pictograms in digital and software products using the
> Carbon Design System

## Getting started

To install `@carbon/pictograms-react` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/pictograms-react
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/pictograms-react
```

## Usage

You can import a pictogram component into your project by referring to its name:

```jsx
import { Airplane } from '@carbon/pictograms-react';
```

We also provide CommonJS and UMD files in the `lib` and `umd` directories,
respectively.

To import using CommonJS, you can do the following:

```js
const { Airplane } = require('@carbon/pictograms-react');
```

_Note: if you would like to find the import path for a pictogram, you can
reference our
[Pictogram Library](https://www.carbondesignsystem.com/guidelines/pictograms/library)_

### Icon fill

All icons from the library support being styled by the `fill` property. You can
change the color of an icon by passing in a custom class name that sets this
property (preferred), or by passing in an inline style. For example:

```css
// CSS custom class name to set the fill of the icon to `rebeccapurple`
svg.my-custom-class {
  fill: rebeccapurple;
}
```

```jsx
import { Airplane } from '@carbon/pictograms-react';

function MyComponent() {
  return (
    <button>
      <Airplane aria-label="Add" className="my-custom-class" />
    </button>
  );
}
```

### Focus and `aria-label`

By default, the icon components from `@carbon/pictograms-react` are treated as
decorative content. This means that we set `aria-hidden="true"` unless certain
props are passed to the component.

If you would like the icon to be announced by a screen reader, you can supply an
`aria-label` or `aria-labelledby`. For example:

```jsx
import { Airplane } from '@carbon/pictograms-react';

function MyComponent() {
  return (
    <button>
      <Airplane aria-label="Add" />
    </button>
  );
}
```

Doing this will add the appropriate `role` to the `<svg>` node, as well.

If you would like the `<svg>` to receive focus, you will need to pass in a
`tabIndex` value. For example:

```jsx
import { Airplane } from '@carbon/pictograms-react';

function MyComponent() {
  return <Airplane aria-label="Add" tabIndex="0" />;
}
```

Including `tabIndex` and `aria-label` (or `aria-labelledby`) will set the
corresponding `tabindex` on the underlying `<svg>` and verify support in older
browsers like Internet Explorer 11 by setting `focusable` to `true`.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
