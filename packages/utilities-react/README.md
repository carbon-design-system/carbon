# @carbon/utilities-react

> Utilities and helpers to drive consistency across software products using the
> Carbon Design System with React

## Getting started

To install `@carbon/utilities-react` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install @carbon/utilities-react
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/utilities-react
```

## Maintainer information

This package uses a convention-based multi-entry build. The supported public API
consists of two parts.

1. The root entrypoint

```js
import { utility } from '@carbon/utilities-react';
```

2. Any top-level module with a `src/<name>/index.*` file

```js
import { utility } from '@carbon/utilities-react/utility';
```

Review the
[architecture decision record (ADR)](../../docs/decisions/0004-adopt-explicit-package-entrypoints-for-utilities.md)
for more detail on how and why this approach is used.

### Adding a utility

1. Create a new top-level directory under `src/`
2. Export the public API for that utility from `src/<name>/index.ts`,
   `index.tsx`, `index.js`, or `index.jsx`
3. Re-export it from `src/index.ts` if it should also be available from the
   package root
4. Build the package and verify the generated outputs under `es/<name>/index.*`
   and `lib/<name>/index.js`

```text
src/
  someReactUtility/
    index.tsx
    someReactUtility.tsx
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
