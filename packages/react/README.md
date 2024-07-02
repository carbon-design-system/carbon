# @carbon/react

> React components for the Carbon Design System

## Getting started

To install `@carbon/react` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/react
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/react
```

This package requires [Dart Sass](http://npmjs.com/package/sass) in order to
compile styles.

If you're new to Sass, we recommend checking out the following resources and
links:

- [Sass Basics](https://sass-lang.com/guide)
- [The Sass `@use` documentation for Sass modules](https://sass-lang.com/documentation/at-rules/use/)
- [The Carbon Design System FAQ on Sass](https://carbondesignsystem.com/migrating/faq/#sass-and-package-management)

For info on how to configure Sass for your project, here are some common
framework's documentation worth reviewing:

- [Next.js with Sass](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support)
- [Remix with Sass](https://remix.run/docs/en/1.18.0/guides/styling#css-preprocessors)
- [Gatsby with Sass](https://www.gatsbyjs.com/docs/how-to/styling/sass/)

Or if you're just using a bundler:

- [Parcel with Sass](https://v2.parceljs.org/languages/sass/)
- [Vite with Sass](https://vitejs.dev/guide/features.html#css-pre-processors)

Or anything else not listed above:

- [Webpack with Sass](https://webpack.js.org/loaders/sass-loader/)
- [Create React App with Sass](https://create-react-app.dev/docs/adding-a-sass-stylesheet/)
- [Snowpack with Sass](https://www.snowpack.dev/guides/sass/)

Once you get Sass up and running in your project, you may need to configure Sass
to include `node_modules` in its `includePaths` option. For more information,
checkout the [configuration](../styles/docs/sass.md#configuration) section in
our Sass docs.

### TypeScript

There is an ongoing project to add `*.d.ts` files to `@carbon/react`. Though not
all components have yet been typed, you can still use the project successfully
in a TypeScript setting, provided you amend to your `tsconfig.json` or
equivalent configuration file. Include the `skipLibCheck: true` compiler option:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

To track the progress of TypeScript adoption, check out:

- [TypeScript Adoption](https://github.com/orgs/carbon-design-system/projects/53)

## Usage

The `@carbon/react` package provides components and icons for the Carbon Design
System.

To use a component, you can import it directly from the package:

```jsx
import { Button } from '@carbon/react';

function MyComponent() {
  return <Button>Example usage</Button>;
}
```

To include the styles for a specific component, you can either import all the
styles from the project or include the styles for a specific component:

```scss
// Bring in all the styles for Carbon
@use '@carbon/react';

// Or bring in the styles for just one component
@use '@carbon/react/scss/components/button';
```

For a full list of components available, checkout our
[Storybook](https://react.carbondesignsystem.com/).

### Icons

The `@carbon/react` package also provides icon components that you can include
in your project. You can import these icon components from the
`@carbon/react/icons` entrypoint:

```jsx
import { Add } from '@carbon/react/icons';

function MyComponent() {
  return <Add />;
}
```

For a full list of icons available, checkout our
[website](https://www.carbondesignsystem.com/guidelines/icons/library/).

## 📖 API Documentation

If you're looking for `@carbon/react` API documentation, check out:

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
