# carbon-components-react

> React components for the Carbon Design System

## Getting started

To install `carbon-components-react` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S carbon-components-react
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add carbon-components-react
```

This package requires [Dart Sass](http://npmjs.com/package/sass) in order to
compile styles.

If you're new to Sass, or are wondering how to configure Sass for your project,
we recommend checking out the following resources and links:

- [Sass Basics](https://sass-lang.com/guide)
- [Webpack with Sass](https://webpack.js.org/loaders/sass-loader/)
- [Next.js with Sass](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)
- [Create React App with Sass](https://create-react-app.dev/docs/adding-a-sass-stylesheet/)
- [Parcel with Sass](https://v2.parceljs.org/languages/sass/)
- [Vite with Sass](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Snowpack with Sass](https://www.snowpack.dev/guides/sass/)

Once you get Sass up and running in your project, configure Sass to include
`node_modules` in its `includePaths` option. For more information, checkout the
[configuration](../styles/docs/sass.md#configuration) section in our Sass docs.

## Usage

The `carbon-components-react` package provides components and icons for the
Carbon Design System.

To use a component, you can import it directly from the package:

```jsx
import { Button } from 'carbon-components-react';

function MyComponent() {
  return <Button>Example usage</Button>;
}
```

To include the styles for a specific component, you can either import all the
styles from the project or include the styles for a specific component:

```scss
// Bring in all the styles for Carbon
@use 'carbon-components-react';

// Preferred: bring in the styles for one component
@use 'carbon-components-react/scss/components/button';
```

For a full list of components available, checkout our
[Storybook](https://react.carbondesignsystem.com/).

## 📖 API Documentation

If you're looking for `carbon-components-react` API documentation, check out:

- [Storybook](https://react.carbondesignsystem.com/)
- [Icon Library](https://www.carbondesignsystem.com/guidelines/icons/library/)

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
