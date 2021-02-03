# @carbon/icons

> Icons for digital and software products using the Carbon Design System

## Getting started

To install `@carbon/icons` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/icons
```

## Usage

Icons in Carbon are provided through a variety of packages, often specific for
the framework that will use them. Currently, we support the following packages
for various frameworks:

- [Angular](https://github.com/carbon-design-system/carbon-icons-angular)
- [React](../icons-react)
- [Vue](../icons-vue)
- [Svelte](https://github.com/IBM/carbon-icons-svelte)

We also support using icons in Vanilla JavaScript.

In order to use an icon, it may be helpful to reference our
[Icon library](https://carbon-elements.netlify.com/icons/examples/preview/)
reference page in order to find the specific icon you would like to use.

### Vanilla

Once you've found an icon and you're looking to use it in Vanilla JavaScript,
you can import the icon by writing the following in your JavaScript file:

```js
import IconName from '@carbon/icons/<module-type>/path-to-icon/size';
```

For example, if I wanted to import the 16x16
[`add`](https://carbon-elements.netlify.com/icons/examples/preview/#16%2Fadd)
icon, I would write:

```js
import AddIcon from '@carbon/icons/es/add/16';
```

In this case, `es` is used for ES2015 modules (ESM), but one may also use `lib`
for CommonJS or `umd` for UMD modules.

In order to render this to the screen, we'll make use of our
[`icon-helpers`](../icon-helpers) package. This package gives us two options for
rendering our icons: `toString` and `toSVG`. If rendering in templates, you may
want to use the former. If rendering to the DOM, `toSVG` may be helpful.

In our case, we'll use `toSVG` to create a node in the DOM for the 16x16 `add`
icon:

```js
import { getAttributes, toSVG } from '@carbon/icon-helpers';
import addIcon from '@carbon/icons/es/add/16';

const addIconNode = toSVG({
  ...addIcon,
  attrs: getAttributes(addIcon.attrs),
});
```

### Styling the inner path

Certain icons in the library support an alternate fill inside of the icon, for
example
[`warning--filled`](https://carbon-elements.netlify.com/icons/examples/preview/#16%2Fwarning--filled)
supports styling the inner `!` path.

In order to style the inner path, you will need to target the SVG using CSS. In
general, you can target the path by writing the following:

```css
svg [data-icon-path='inner-path'] {
  fill: blue;
  opacity: 1;
}
```

In the code snippet above, we are targetting the inner path attribute with
`[data-icon-path="inner-path"]`. The value of `fill` will be the custom color
you would like to set for the inner path. We also need to set `opacity` to `1`
in order to get this inner path to be visible on the page.

### Reference

You can view a full reference of our icons
[here](https://carbon-elements.netlify.com/icons/examples/preview/) . This is
useful for finding the path information in order to import an icon.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
