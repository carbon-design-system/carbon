# @carbon/colors

> Colors for digital and software products using the Carbon Design System

## Getting started

To install `@carbon/colors` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/colors
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/colors
```

## Usage

You can use the `@carbon/colors` module in your JavaScript, in addition to your
Sass.

### Sass

In Sass, you can import the files individual by doing:

```scss
@use '@carbon/colors';

// Another way if using `@carbon/react
@use '@carbon/react/scss/colors';
```

These color variables follow the naming convention: `<swatch>-<grade>`. For
example:

```scss
colors.$blue-50;
colors.$cool-gray-10;
colors.$black-100;
colors.$white-0;
```

Alongside the color variables detailed above, we also provide a map of colors so
that you can programmatically use these values. This map is called `$colors` and
each key is the name of a swatch. The value of these swatches is also a map, but
each key is now the grade. In code, this looks like the following:

<!-- prettier-ignore-start -->

```scss
$colors: (
  'blue': (
    10: #edf4ff,
    // ...
  )
);
```

<!-- prettier-ignore-end -->

### JavaScript

For JavaScript, you can import and use this module by doing the following in
your code:

```js
// ESM
import { black, blue, warmGray } from '@carbon/colors';

// CommonJS
const { black, blue, warmGray } = require('@carbon/colors');
```

Each color swatch is exported as a variable, and each color name is also
exported as an object that can be called by specifying grade, for example:

```js
black;
blue[50]; // Using the `blue` object.
warmGray100; // Using the `warmGray100` variable.
```

## 📚 Examples

If you're looking for more examples on how to use `@carbon/colors`, we have some
examples that you can check out:

- [sass-modules](./examples/sass-modules)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect metrics data. By installing this
package as a dependency you are agreeing to telemetry collection. To opt out,
see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
