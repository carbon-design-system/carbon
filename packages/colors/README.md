# @carbon/colors

> Colors for digital and software products using the Carbon Design
> System

## Getting started

To install `@carbon/colors` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/colors
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following
command instead:

```bash
yarn add @carbon/colors
```

## Usage

You can use the `@carbon/colors` module in your JavaScript, in
addition to your Sass.

### Sass

In Sass, you can import the files individual by doing:

```scss
@import '@carbon/colors/scss/colors';
```

This will make all the colors and token variables available to you in
your file. They are named with the following structure: `$ibm-color__swatch-grade`, for example:

```scss
$ibm-colors__blue-50;
$ibm-colors__warm-gray-100;
```

If you would like a mixin to conditionally include these variables, you can
include the mixin by using:

```scss
@import '@carbon/colors/scss/mixins';

@include ibm--colors();
```

### JavaScript

For JavaScript, you can import and use this module by doing the
following in your code:

```js
// ESM
import { black, blue, warmGray } from '@carbon/colors';

// CommonJS
const { black, blue, warmGray } = require('@carbon/colors');
```

Each color swatch is exported as a variable, and each color name is
also exported as an object that can be called by specifying grade, for
example:

```js
black;
blue[50]; // Using the `blue` object.
warmGray100; // Using the `warmGray100` variable.
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new
features, or help us improve the project documentation. If you're
interested, definitely check out our [Contributing Guide](/.github/CONTRIBUTING.md)
! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
