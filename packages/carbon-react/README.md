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

## Usage

**Note: this package is unstable and will change before it's 1.0 release**

You can use the `@carbon/react` to bring in components, icons, and styles from
the Carbon Design System.

To include a component, you can import it:

```jsx
import { Button } from '@carbon/react';

function MyComponent() {
  return <Button>Example usage</Button>;
}
```

To include an icon, use the `@carbon/react/icons` entrypoint and import it the
same way you would import a component:

```jsx
import { Add } from '@carbon/react/icons';

function MyComponent() {
  return <Add />;
}
```

For styles, you can bring them in using Sass Modules:

```jsx
@use '@carbon/react';
```

Note: you will need to configure Sass in order to correctly find modules in your
`node_modules`. Follow [this guide](./docs/sass.md#configuration) to make sure
your project is setup correctly.

## 📖 API Documentation

If you're looking for `@carbon/react` API documentation, check out:

- [Sass](./docs/sass.md)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
