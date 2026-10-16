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
motion modes: productive and expressive. It also provides duration tokens and
named motion surfaces. You can access these using either Sass or JavaScript.

> **Build note:** Token values are generated at build time from
> `src/dtcg/motion.json` and `src/dtcg/surfaces.json`. Run `yarn build` (or
> `npm run build`) once after cloning so that `js/generated/` and
> `scss/generated/` are present.

### Sass

`@carbon/motion` exports a `motion` function and `motion` mixin for easing
curves, duration token variables, a `surface` function and `surface` mixin for
named motion surfaces. Bring in the package with `@use`:

```scss
@use '@carbon/motion';

.my-selector {
  // Easing curve — productive mode by default
  transition-timing-function: motion.motion(standard);
}

.my-selector-expressive {
  // Easing curve with explicit mode, set as transition-timing-function
  @include motion.motion(standard, expressive);
}

.my-panel {
  // Apply a named motion surface (handles enter/exit keyframes and timing)
  @include motion.surface(contextual);
}
```

Available duration variables:

```scss
@use '@carbon/motion';

.my-selector {
  transition-duration: motion.$duration-fast-01; // 70ms
  transition-duration: motion.$duration-moderate-01; // 150ms
  transition-duration: motion.$duration-slow-01; // 400ms
}
```

### JavaScript

If you're using `@carbon/motion` as a JavaScript dependency, we export easings,
duration tokens, a `motion` function, and surface utilities:

```js
// ESM
import {
  easings,
  motion,
  // Duration tokens
  durationFast01,
  durationModerate01,
  durationSlow01,
  // Surface utilities
  surfaces,
  getMotionSurface,
  defineMotionSurface,
} from '@carbon/motion';

motion('standard', 'productive'); // Returns a string `cubic-bezier()` function
getMotionSurface('contextual'); // Returns the surface definition object
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect de-identified and anonymized metrics
data. By installing this package as a dependency you are agreeing to telemetry
collection. To opt out, see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
