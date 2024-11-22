# `@carbon/web-components`

> Web components for the Carbon Design System

## Getting started

To install `@carbon/web-components` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install --save @carbon/web-components
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/web-components
```

### Usage

#### ES imports

The first thing you need is **setting up a module bundler** to resolve
ECMAScript `import`s. The above example uses [Webpack](https://webpack.js.org),
but you can use other bundlers like [Rollup](https://rollupjs.org/) too.

Once you set up a module bundler, you can start importing component modules:

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

See a working example
[here](https://stackblitz.com/github/carbon-design-system/carbon/tree/main/packages/web-components/examples/components/dropdown).

#### CDN

The CDN artifacts define the custom elements for the browser, so they can be
directly used once the script tag has been added to the page. For example:

```html
<!doctype html>
<html>
  <head>
    <script
      type="module"
      src="https://1.www.s81c.com/common/carbon/web-components/tag/v2/latest/dropdown.min.js"></script>
    <style type="text/css">
      // Suppresses the custom element until it has been defined
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

Each component is available by referencing a specific version (starting at
version `v1.16.0`):

<!-- By specific version -->
<script
  type="module"
  src="https://1.www.s81c.com/common/carbon/web-components/version/v2.16.0/accordion.min.js"></script>

```

See a working example
[here](https://stackblitz.com/github/carbon-design-system/carbon/tree/main/packages/web-components/examples/components/dropdown?file=cdn.html).

For a full list of components available, check out our
[Storybook](https://web-components.carbondesignsystem.com/).

### Other usage guides

- [Using components in a form](./docs/form.md)
- [Using custom styles in components](./docs/styling.md)

## Getting started with development

1. Fork this repository and clone it
2. `yarn install`
3. `cd packages/carbon-web-components`
4. `yarn wca && yarn storybook`

## Creating build

```

> yarn install yarn build

```

You'll see the build artifacts in `/path/to/carbon-web-components/es` directory.

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
```
