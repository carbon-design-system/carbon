# `@carbon/motion`

> Motion helpers for digital and software products using the Carbon Design System.

## Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/motion
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/motion
```

## Usage

### JavaScript

If you're using `@carbon/motion` as a JavaScript dependency, we export our
easings and a function called `motion` that you can use. For example:

```js
// CommonJS
const { easings, motion } = require('@carbon/motion');
```

You can also include this as a JavaScript module:

```js
// ESM
import { easings, motion } from '@carbon/motion';

motion('standard', 'productive'); // Returns a string `cubic-bezier()` function
```

### Styles

If you're using `@carbon/motion` as a Sass dependency, we export a function and
mixin called `motion` that you can use to get the correct `transition-property`
for your styles.

You can import `@carbon/motion` by including it at the top of your file like so:

```scss
@import '@carbon/motion/scss/motion.scss';

.my-custom-selector {
  // Function for `motion`
  transition-property: motion(standard, productive);
}

.my-other-custom-selector {
  // Shortcut for above, sets `transition-property` with the value for the
  // standard easing curve in productive mode.
  @include motion(standard, productive);
}
```

## 🤲 Contributing

To learn more about how to contribute, look [here](/.github/CONTRIBUTING.md)!
