# @carbon/feature-flags

> Build with feature flags in Carbon

## Getting started

To install `@carbon/feature-flags` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/feature-flags
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/feature-flags
```

## Usage

The `@carbon/feature-flags` provides a runtime-based feature flag system that
you can use to enable or disable experimental features from Carbon or in your
own code.

To check if a feature flag is enabled, you can use the `enabled` function in
JavaScript:

```js
import { enabled } from '@carbon/feature-flags';

enabled('feature-flag-name');
```

In Sass, you would use the `enabled` function or mixin:

```scss
@use '@carbon/feature-flags';

// Return true if the flag is enabled
@if feature-flags.enabled('feature-flag-name') {
  //
}

@include enabled('feature-flag-name') {
  // only include contents if the flag is enabled
}
```

### Managing feature flags

You can change whether a feature flag is enabled. In JavaScript, you can use the
`enable`, `disable`, and `merge` functions to accomplish this.

```js
import { enable, disable, merge } from '@carbon/feature-flags';

// Enable `feature-flag-a`
enable('feature-flag-a');

// Disable `feature-flag-a`
disable('feature-flag-a');

// Set a variety of feature flags to a specific value
merge({
  'feature-flag-a': true,
  'feature-flag-b': false,
  'feature-flag-c': true,
});
```

In Sass, you can configure whether a feature flag is enabled when you include
the module or by using `enable`, `disable`, and `merge`.

```scss
@use '@carbon/feature-flags' with (
  $feature-flags: (
    'feature-flag-a': false,
    'feature-flag-b': true,
  )
);

// Enable `feature-flag-a`
@include feature-flags.enable('feature-flag-a');

// Disable `feature-flag-b`
@include feature-flags.disable('feature-flag-b');

// Set a variety of feature flags to a specific value
@include feature-flags.merge(
  (
    'feature-flag-a': true,
    'feature-flag-b': true,
  )
);
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
