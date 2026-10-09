# `@carbon/web-components`

> Web components for the Carbon Design System

## Getting started

To install `@carbon/web-components` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/web-components
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/web-components
```

### Usage

The `@carbon/web-components` package provides components for the Carbon Design
System.

To use a component, you can import it directly from the package:

```javascript
import '@carbon/web-components/es/components/dropdown/dropdown.js';
import '@carbon/web-components/es/components/dropdown/dropdown-item.js';
```

Once you've imported the component modules, you can use the components in the
same manner as native HTML tags:

```html
<cds-dropdown trigger-content="Select an item">
  <cds-dropdown-item value="all">Option 1</cds-dropdown-item>
  <cds-dropdown-item value="cloudFoundry">Option 2</cds-dropdown-item>
  <cds-dropdown-item value="staging">Option 3</cds-dropdown-item>
  <cds-dropdown-item value="dea">Option 4</cds-dropdown-item>
  <cds-dropdown-item value="router">Option 5</cds-dropdown-item>
</cds-dropdown>
```

#### CDN

CDN artifacts are also available and can be added directly to the page (starting
at version `v1.16.0`):

```html
<!doctype html>
<html>
  <head>
    <script
      type="module"
      src="https://1.www.s81c.com/common/carbon/web-components/version/v2.24.0/dropdown.min.js"></script>
    <style type="text/css">
      <!-- hide custom element until it has been defined //-->
      cds-dropdown:not(:defined),
      cds-dropdown-item:not(:defined) {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <div id="app">
      <cds-dropdown trigger-content="Select an item">
        <cds-dropdown-item value="all">Option 1</cds-dropdown-item>
        <cds-dropdown-item value="cloudFoundry">Option 2</cds-dropdown-item>
        <cds-dropdown-item value="staging">Option 3</cds-dropdown-item>
        <cds-dropdown-item value="dea">Option 4</cds-dropdown-item>
        <cds-dropdown-item value="router">Option 5</cds-dropdown-item>
      </cds-dropdown>
    </div>
  </body>
</html>
```

### Preparing for v3

The next major release (v3) changes how components register. See the
[v3 migration guide](../../docs/guides/cwc-v3-migration.md) to prepare.

**Available now.** Both the opt-in registration API — `defineCustomElement`
(`es/globals/register.js`) and the `static is` tag field — are available in v2,
so you can write v3-ready code today.

**Deprecated (will be removed in v3):**

- **The `carbonElement` decorator** (`es/globals/decorators/carbon-element.js`),
  used to author your own custom elements — migrate to Lit's `customElement`
  (`import { customElement } from 'lit/decorators.js'`).
- **The `es-custom` build** (`cds-custom-*` elements), replaced by custom tag
  names, a prefixed build, and scoped registries.
- **The `custom-elements.json` WCA manifest**, replaced by the standard Custom
  Elements Manifest (CEM).

**Breaking in v3:** In v3, importing a component's class file no longer
registers its element, e.g. importing `button/button.js` instead of
`button/index.js`. Test using the `v3` tag — built from the
[`feat/web-components-v3`](https://github.com/carbon-design-system/carbon/tree/feat/web-components-v3)
branch.

### Other usage guides

- [Using components in a form](./docs/form.md)
- [Using custom styles in components](./docs/styling.md)
- [Migrating to v3](../../docs/guides/cwc-v3-migration.md)

## 📖 API Documentation

If you're looking for `@carbon/web-components` API documentation, check out:

- [Storybook](https://web-components.carbondesignsystem.com/)

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
