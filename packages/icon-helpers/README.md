# @carbon/icon-helpers

> Helpers used alongside icons for digital and software products using the
> Carbon Design System

## Getting started

To install `@carbon/icon-helpers` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icon-helpers
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/icon-helpers
```

## Usage

`@carbon/icon-helpers` provides a couple of helpers for rendering `<svg>` nodes
in a document, or to help get the correct attributes to set on an `<svg>` node.
These include:

| Name               | Type                              | Description                                                                  |
| ------------------ | --------------------------------- | ---------------------------------------------------------------------------- |
| `getAttributes`    | `(attributes: Object) => Object`  | Get the attributes for an `<svg>` node                                       |
| `formatAttributes` | `(attributes: Object) => String`  | Format the attributes into a string that can be applied to a node in the DOM |
| `toString`         | `(descriptor: Object) => String`  | Format the given icon descriptor into a string. Useful for templates         |
| `toSVG`            | `(descriptor: Object) => DOMNode` | Format the given icon descriptor into a DOM node                             |

For most of the methods, `attributes` corresponds with whatever the name and
value would be if you were writing the HTML for the `<svg>`. For example, if we
wanted to set `width` and `height` we would do the following:

```js
const { getAttributes } = require('@carbon/icon-helpers');
const attributes = getAttributes({ width: 20, height: 20 });
```

In order for the icon to be considered focusable, you will need to provide
either `aria-label`, `aria-labelledby`, or `title` in the given `attributes` in
addition to `tabindex`. For example:

```js
const { getAttributes } = require('@carbon/icon-helpers');
const attributes = getAttributes({
  'aria-label': 'My icon label',
  tabindex: '0',
});
```

### Icon descriptors

An icon descriptor is the term we use to describe icon objects exported by
`@carbon/icons`. By default, they will have the following shape:

```js
{
  elem: 'svg',
  attrs: {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 16 16',
    width: 16,
    height: 16,
  },
  content: [
    {
      elem: 'path',
      attrs: {
        d: '...',
      },
    },
  ],
  name: 'IconName',
  size: 16,
}
```

You can import these definitions directly from `@carbon/icons` and use them
alongside `toSVG` or `toString` by doing:

```js
import { IconName } from '@carbon/icons';
import { toString, toSVG } from '@carbon/icon-helpers';

const iconString = toString(IconName);
const iconSVG = toSVG({
  ...IconName,
  attrs: {
    ...IconName.attrs,
    myCustomAttribute: 'myCustomAttributeValue',
  },
});
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
