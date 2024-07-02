# @carbon/elements

> A collection of design elements in code for the IBM Design Language

## Getting started

To install `@carbon/elements` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/elements
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/elements
```

## Usage

`@carbon/elements` includes all of the other elements packages in the project
and can be useful instead of installing each package individually. This package
offers support for both the JavaScript exports from these packages, in addition
to Sass support.

### Sass

`@carbon/elements` provides two entrypoints for you to leverage: a bundled
entrypoint and a module entrypoint. For most use-cases, the bundled entrypoint
will work for you. If you have taken an extra step to configure your build
configuration to properly resolve `@import`s from files, then feel free to use
the module entrypoint.

To include the bundled entrypoint, you can include the following in your Sass
file:

```scss
@import '@carbon/elements/scss/elements';

# Import a specific package nested in elements
@import '@carbon/elements/scss/themes/g10';
```

Include in the example above is how to access nested packages. These packages
are ones that you could optionally install as a package, like `@carbon/themes`,
but we've included them inline as a convenience.

To include the module entrypoint, you can include the following in your Sass
file:

```scss
@import '@carbon/elements/scss/index';
```

### JavaScript

`@carbon/elements` re-exports the exports from all of the packages that it
exports. That means that if an individual package exports a value, then you can
import it the same way when using `@carbon/elements`. For example, with
`@carbon/colors` we might write:

```js
import { colors } from '@carbon/colors';
```

With `@carbon/elements`, you can also import `colors`:

```js
import { colors } from '@carbon/elements';
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
