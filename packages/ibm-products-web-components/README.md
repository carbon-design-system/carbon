# @carbon/ibm-products-web-components

> Carbon for IBM Products web components

## Getting started

If you’re just getting started and looking to browse our web components, take a
look at
[our Storybook](https://ibm-products-web-components.carbondesignsystem.com/).

### 📦 Installing Carbon for IBM Products web components

To use Carbon for IBM Products web components, all you need to do is install the
`@carbon/ibm-products-web-components` package.

```shell
$ yarn add @carbon/ibm-products-web-components

# or

$ npm install @carbon/ibm-products-web-components
```

Then you can import the component styles in your `index.js`.

```js
import '@carbon/ibm-products/css/index.min.css';
```

### Usage

To use a component, you can import it directly from the package:

```javascript
import '@carbon/ibm-products-web-components/es/components/about-modal.js';
```

Once you've imported the component modules, you can use the components in the
same manner as native HTML tags:

```html
<c4p-about-modal
  closeIconDescription="Close"
  copyrightText="Copyright © IBM Corp. 2025"
  .title="IBM Product Name"
  .version="0.0.0"
></c4p-about-modal>
```

## 📖 API Documentation

If you're looking for `@carbon/ibm-products-web-components` API documentation,
check out:

- [Storybook](https://ibm-products-web-components.carbondesignsystem.com/)

### Building and running Storybook locally

To get started, run the following commands and Storybook will be built and then
served on port `3000` on your local machine.

If this is your first time running web components in Storybook, run the
following commands:

```shell
yarn
yarn build
```

Then run Storybook:

```shell
yarn storybook-wc
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our
[Contributing Guide](https://github.com/carbon-design-system/ibm-products/blob/main/.github/CONTRIBUTING.md)!
👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect de-identified and anonymized metrics
data. By installing this package as a dependency you are agreeing to telemetry
collection. To opt out, see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
