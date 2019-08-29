# babel-plugin-transform-carbon-imports

> Babel plugin to transform imports for projects using the Carbon Design System

## Getting started

To install `babel-plugin-transform-carbon-imports` in your project, you will
need to run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S babel-plugin-transform-carbon-imports
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add babel-plugin-transform-carbon-imports
```

## Usage

In your babel config you add the following:

```json
{
  "plugins": ["transform-carbon-imports"]
}
```

### Options

`babel-plugin-transform-carbon-imports` supports a couple of options, namely:

- `throwOnNamespace`: toggle whether you want the plugin to throw when it
  encounters `import * from 'carbon-components-react'` syntax.

You can pass in these options when adding the plugin to your babel
configuration, for example:

```json
{
  "plugins": [["transform-carbon-imports", { "throwOnNamespace": false }]]
}
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
