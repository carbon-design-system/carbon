# eslint-config-carbon

> ESLint configuration for Carbon

## Getting started

To install `eslint-config-carbon` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S eslint-config-carbon
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add eslint-config-carbon
```

## Usage

You can use `eslint-config-carbon` in your project by extending it in your
`eslint` configuration. For example, if we had an `.eslintrc` file:

```json
{
  "extends": ["carbon"]
}
```

The default configuration available under `eslint-config-carbon` includes all
ESLint configuration and plugins, including plugins for React.js development. If
you'd like to not include these rules in your setup, you can also include a
`base` or `vanilla` oriented configuration by doing the following:

```json
{
  "extends": ["eslint-config-carbon/base"]
}
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
