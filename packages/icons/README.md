# @carbon/icons

> Icons for digital and software products using the Carbon Design System

## Getting started

To install `@carbon/icons` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following
command instead:

```bash
yarn add @carbon/icons
```

## Usage

Icons in Carbon are provided through a variety of packages, often
specific for the framework that will use them. Currently, we support
the following packages for various frameworks:

- [Angular](../icons-angular)
- [React](../icons-react)
- [Vue](../icons-vue)

We also support using icons in Vanilla JavaScript.

In order to use an icon, it may be helpful to reference our [Icon
library](https://carbon-elements.netlify.com/icons/examples/preview/)
reference page in order to find the specific icon you would like to
use.

### Vanilla

Once you've found an icon and you're looking to use it in Vanilla
JavaScript, you can import the icon by writing the following in your
JavaScript file:

```js
import IconName from '@carbon/icons/<module-type>/path-to-icon/size';
```

For example, if I wanted to import the 16x16 [`add`](https://carbon-elements.netlify.com/icons/examples/preview/#16%2Fadd)
icon, I would write:

```js
import AddIcon from '@carbon/icons/es/add/16';
```

In this case, `es` is used for ES2015 modules (ESM), but one may also
use `lib` for CommonJS or `umd` for UMD modules.

In order to render this to the screen, we'll make use of our
[`icon-helpers`](../packages/icon-helpers) package. This package gives
us two options for rendering our icons: `toString` and `toSVG`. If
rendering in templates, you may want to use the former. If rendering
to the DOM, `toSVG` may be helpful.

In our case, we'll use `toSVG` to create a node in the DOM for the
16x16 `add` icon:

```js
import { getAttributes, toSVG } from '@carbon/icon-helpers';
import addIcon from '@carbon/icons/es/add/16';

const addIconNode = toSVG({
  ...addIcon,
  attrs: getAttributes(addIcon.attrs),
});
```

### Reference

You can view a full reference of our icons [here](https://carbon-elements.netlify.com/icons/examples/preview/)
. This is useful for finding the path information in order to import
an icon.

## 📖 API Documentation

If you're looking for `@carbon/icons` API documentation, check out:

- [Sass](./docs/sass.md)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new
features, or help us improve the project documentation. If you're
interested, definitely check out our [Contributing Guide](/.github/CONTRIBUTING.md)
! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
