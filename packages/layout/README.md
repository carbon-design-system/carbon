# @carbon/layout

> Layout helpers for digital and software products using the Carbon Design
> System

## Getting started

To install `@carbon/layout` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/layout
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/layout
```

## Usage

`@carbon/layout` provides a couple of useful utilities alongside the
specification for the grid system for the IBM Design Language. This package
includes:

| Feature         | Description                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Breakpoints     | Variables and settings for the IBM Design Grid, including gutter and breakpoints. It also includes helpers for working with breakpoints |
| Unit conversion | Helpers for converting from `px` to `rem` or `em`.                                                                                      |
| Key heights     | Helpers for working with key heights at different breakpoints                                                                           |
| Mini unit       | Helpers for working in multiples of the mini-unit                                                                                       |
| Spacing         | Provides a spacing scale and helper for using steps in the scale                                                                        |

One important thing to remember is that `@carbon/layout` is not responsible for
the grid itself. If you are looking for a grid implementation to use, definitely
check out the [`@carbon/grid`](../grid) package.

`@carbon/layout` provides the above features in both Sass and JavaScript. If
you're looking for support in a different language, feel free to file an issue
proposing the new addition!

### Modifying token values

Token values are defined in [`src/dtcg/layout.json`](./src/dtcg/layout.json)
using the [DTCG token format](https://tr.designtokens.org/format/). This is the
single source of truth for the package — **do not edit generated files
directly**.

The following files are generated at build time and should not be hand-edited:

- `js/generated/layout-tokens.js` / `js/generated/layout-tokens.d.ts` — JS
  exports
- `scss/generated/` — Sass variables and maps, one file per token group

To add or update a token:

1. Edit `src/dtcg/layout.json`
2. Run `yarn build` in this package to regenerate all outputs
3. Run `yarn test --testPathPatterns=packages/layout` from the repo root to
   confirm nothing regressed

For a detailed guide to the token format, converters, and how to add a new token
category, see [`src/dtcg/README.md`](./src/dtcg/README.md).

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
