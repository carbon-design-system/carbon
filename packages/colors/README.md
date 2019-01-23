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

### JavaScript

For JavaScript, you can import and use this module by doing the
following in your code:

```js
// ESM
import { colors, tokens } from '@carbon/colors';

// CommonJS
const { colors, tokens } = require('@carbon/colors');
```

Each color swatch is exported on the `colors` object and can be called
by specifying the name and grade, for example:

```js
colors.black;
colors.blue50;
colors.warmGray100;
```

Similary, you can access tokens on the `tokens` object, for example:

```js
tokens.brand01;
tokens.activePrimary;
```

### Sass

In Sass, you can import the files individual by doing:

```scss
@import '@carbon/colors/scss/colors';
@import '@carbon/colors/scss/tokens';
```

This will make all the colors and token variables available to you in
your file. They are named with the following structure: `$ibm-color__swatch--grade`, for example:

```scss
$ibm-color__blue--50;
$ibm-color__warm-gray--100;
```

Similarly, you can access the `tokens` variables after including them.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new
features, or help us improve the project documentation. If you're
interested, definitely check out our [Contributing Guide](/.github/CONTRIBUTING.md)
! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
