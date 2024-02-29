# @carbon/import-once

> Sass helper for importing files only once. Used in the Carbon Design System

## Getting started

To install `@carbon/import-once` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/import-once
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/import-once
```

## Usage

`@carbon/import-once` is helpful when needing to guarantee that a module is
loaded only once. It does this by exporting a `exports` mixin that you can use.

This mixin is particularly useful when you have a situation where your work
might share common dependencies that you don't want duplicated. For example,
imagine we had modules `a.scss` and `b.scss` that both import `c.scss`. Using
the `exports` mixin from `@carbon/import-once` will guarantee that `c.scss` is
loaded only once.

This looks like:

```scss
// a.scss
@import 'c';

// b.scss
@import 'c';

// c.scss
@import '@carbon/import-once/scss/import-once';

@include exports('c') {
  // ...
}
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
