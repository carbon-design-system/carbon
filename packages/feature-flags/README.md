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

To enable a feature flag, you will need to enable it in each of the environments
that you're using it in. Often times, this will mean JavaScript, Sass, or both.

To enable a flag in JavaScript, you would use `enableFeatureFlag`:

```js
import { enableFeatureFlag } from '@carbon/feature-flags';

enableFeatureFlag('feature-flag-name');
```

To enable a flag in Sass, you would set the `$feature-flags` variable:

```scss
@import '@carbon/feature-flags/scss/feature-flags';

$feature-flags: map-merge(
  $feature-flags,
  (
    'feature-flag-name': true,
  )
);
```

### Managing and using feature flags

You can use the `@carbon/feature-flags` package to build on top of existing
feature flags, or to add your own.

You can add and toggle flags in JavaScript and Sass. In JavaScript, this would
look like:

```js
import {
  addFeatureFlag,
  enableFeatureFlag,
  disableFeatureFlag,
  featureFlagEnabled,
} from '@carbon/feature-flags';

// Specify a default value for the flag
addFeatureFlag('feature-flag-name', false);

// You can use `featureFlagEnabled` to conditionally run
// branches of your code
if (featureFlagEnabled('feature-flag-name')) {
  // Run code if the flag is enabled
}

// You can also modify the value of the flag
disableFeatureFlag('feature-flag-name');
enableFeatureFlag('feature-flag-name');
```

In Sass, you would write the following:

```scss
@import '@carbon/feature-flags/scss/feature-flags';

$feature-flags: map-merge(
  $feature-flags,
  (
    'feature-flag-name': true,
  )
);

@if feature-flag-enabled('feature-flag-name') {
  // ...
}

// You can also run this as a mixin to conditionally include
// code
.my-selector {
  @include feature-flag-enabled('feature-flag-name') {
    // ...
  }
}
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
