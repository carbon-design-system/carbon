# @carbon/react

React components for the Carbon Design System.

## Installation

```bash
npm install @carbon/react
```

If you compile Carbon styles in your application, install
[Dart Sass](https://www.npmjs.com/package/sass) as well:

```bash
npm install sass
```

For Sass configuration, see Carbon's
[Sass documentation](../styles/docs/sass.md#configuration).

TypeScript declarations are included.

## Usage

The `@carbon/react` package provides components and icons for the Carbon Design
System.

To use a component, you can import it directly from the package:

```tsx
import { Button } from '@carbon/react';

function MyComponent() {
  return <Button>Example usage</Button>;
}
```

To include all Carbon styles, use:

```scss
@use '@carbon/react';
```

To include styles for a specific component, use:

```scss
@use '@carbon/react/scss/components/button';
```

For a full list of available components, see our
[Storybook](https://react.carbondesignsystem.com/).

### Icons

The `@carbon/react` package also provides icon components that you can include
in your project. You can import these icon components from the
`@carbon/react/icons` entrypoint:

```tsx
import { Add } from '@carbon/react/icons';

function MyComponent() {
  return <Add />;
}
```

For a full list of available icons, see the Carbon
[Icon Library](https://carbondesignsystem.com/elements/icons/library/).

## Contributing

See the [Contributing Guide](../../.github/CONTRIBUTING.md).

## License

Licensed under the [Apache 2.0 License](../../LICENSE).

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect de-identified and anonymized metrics
data. By installing this package as a dependency you are agreeing to telemetry
collection. To opt out, see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
