# carbon-components-react

> A collection of
> [Carbon Components](https://github.com/carbon-design-system/carbon/tree/master/packages/components)
> implemented using [React](https://reactjs.org/).

### Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S carbon-components-react carbon-components carbon-icons
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add carbon-components-react carbon-components carbon-icons
```

1. These components require the use of
   [Webpack](http://webpack.github.io/docs/tutorials/getting-started/) in your
   project. See our
   [`webpack.config.js`](/packages/react/.storybook/webpack.config.js) for an
   example configuration.

2. Components do not import any of the styles themselves, use the scss or css
   from `carbon-components` to bring in styling. You can also use the `unpkg`
   cdn to bring in the styles wholesale -
   `unpkg.com/carbon-components/css/carbon-components.css` aliases the latest
   css file.

3. For older browsers (e.g. IE11), polyfills listed in
   [`carbon-components-react/.storybook/polyfills.js` file](./.storybook/polyfills.js)
   is required.

If you only want to try out `carbon-components-react`, you can also use
[CodeSandbox](https://codesandbox.io/s/github/carbon-design-system/carbon/tree/master/packages/react/examples/codesandbox).

[![Edit carbon-components-react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/carbon-design-system/carbon/tree/master/packages/react/examples/codesandbox)

## Usage

### List of Available Components

View available React Components [here](http://react.carbondesignsystem.com). You
can see usage information in several ways:

1. Clicking the blue **Show Info** icon in the top right corner of the selected
   component. You can see the list of available React props
2. Clicking the **STORY** tab at the bottom. This tab contains the code that
   shows how the component is being used
3. Clicking the **KNOBS** tab at the bottom and changing values there. Most
   knobs are shown as something like `Button kind (kind)`, where `kind` is the
   name of React prop
4. Clicking the **ACTION LOGGER** tab at the bottom and interacting with the
   selected component. You may see something like `onClick` which typically
   indicates that the event handler (React prop) with the same name is called.
   You can also expand the twistie to see the details of the event
5. Clicking the **README** tab at the bottom. You can see some more document for
   some components

# :books: Documentation

- See our
  [documentation site](https://www.carbondesignsystem.com/get-started/develop/react)
  for full how-to docs and guidelines
- [Contributing](/.github/CONTRIBUTING.md): Guidelines for making contributions
  to this repo
- [🏃‍♀️ Migration Guides](./docs/migration)
  - [v6 to v7](./docs/migration/migrate-to-7.x.md)

## Contributing

Please check out our [Contribution Guidelines](/.github/CONTRIBUTING.md) for
detailed information on how you can lend a hand.
