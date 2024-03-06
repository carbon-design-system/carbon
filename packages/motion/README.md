# @carbon/motion

> Motion helpers for digital and software products using the Carbon Design
> System

## Getting started

To install `@carbon/motion` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/motion
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/motion
```

## Usage

`@carbon/motion` supports standard, entrance, and exit easing curves in two
motion modes: productive and expressive. You can access these curves using
either Sass or JavaScript.

### Sass

`@carbon/motion` exports a `carbon--motion` function and `carbon--motion` mixin
that you can use to access the value of a motion curve or include that curve as
the `transition-timing-function` for a selector. To use these helpers, you can
do the following in your project:

```scss
@import '@carbon/motion/scss/motion.scss';

.my-custom-selector {
  // Supplies the standard easing curve, using the productive mode by default
  transition-timing-function: carbon--motion(standard);
}

.my-custom-selector-v2 {
  // Supplies the standard easing curve, but with the expressive mode, on the
  // transition-timing-function property for this selector
  @include carbon--motion(standard, expressive);
}
```

Both the `motion` function and mixin support passing in the name of the motion
curve and the mode you want to work in.

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
