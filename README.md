# Carbon Components React

**React component library for building websites and UIs with Carbon**

This repository provides a collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using [React](https://facebook.github.io/react/).

## Usage

### List of Available Components

View available React Components [here](https://react.carbondesignsystem.com). Usage information is available when you click the blue **?** icon in the top right corner of the selected component.

### Getting Started

```
npm install -S carbon-components-react
```

1. These components require the use of [Webpack](http://webpack.github.io/docs/tutorials/getting-started/) in your project. See our [`webpack.config.js`](/.storybook/webpack.config.js) for an example configuration.
  * Each component has an associated stylesheet, which requires several webpack loaders (as seen in the example configuration)
  * Webpack should configure the `importPaths` property of `sassLoader` to include the `node_modules` directory so that the stylesheets can be found from `@import` statements
  * To install webpack and all of the loaders in the example configuration
  ```
  $ npm install -D webpack sass-loader css-loader style-loader postcss-loader
  ```

2. Components do not import any of the global styles (font-family, font-size, body color, etc.). As such, you'll need to pull them into your project. One way to accomplish this is to create a SASS file that declares the use of globals and pulls in the global SASS module.

3. Example usage:

  ```scss
  $use-globals: true;
  @import 'carbon-components/consumables/scss/global/global.scss';
  ```

  ```javascript
  import { Loading } from 'carbon-components-react';
  import './styles.scss'
  ReactDOM.render(
    <Loading className="example-loading" />,
    document.getElementById('example-container')
  );
  ```

4. If you want to turn off the automatic `scss`, set `EXCLUDE_SASS` environment variable, like:

```sh
> EXCLUDE_SASS=true
> {your build command}
```

For WebPack build, you'll need to have Babel, etc. eliminate dead code `EXCLUDE_SASS` environment variable creates. Here's a WebPack2 configuration for example:

  ```javascript
  {
    test: /node_modules\/@console\/bluemix-components-react\/.*\.js$/,
    loader: 'babel-loader',
    query: {
      plugins: ['transform-inline-environment-variables', 'minify-dead-code-elimination'],
    },
  },
  ```

## Development

Please refer to the [Contribution Guidelines](CONTRIBUTING.md) before starting any work.

### Using the server

We recommend the use of [React Storybook](https://github.com/storybooks/react-storybook) for developing components.

1. Start the server:

	```
	$ npm run storybook
	```

2. Open browser to `http://localhost:9001/`.

3. Develop components in their respective folders (`/components` or `/internal`).

4. Write stories for your components in `/.storybook`.

## a11y testing

This project is scanned according to [IBM a11y standards](https://w3-connections.ibm.com/wikis/home?lang=en-us#!/wiki/Wa7b684534a33_4971_b961_4529f9ad4a2e/page/CI%20162%20compliance%20information) when PRs are opened against it using [`@ibma/aat`](https://github.ibm.com/IBMa/Tools-Auto-Node/blob/master/src/README.md) to scan the components in the form of rendered HTML.

These tests can also be ran locally at any time by running:

  ```
  $ npm run test-a11y
  ```

Pull requests that introduce more a11y violations than are currently present will not pass code review.  See the [Contribution Guidelines](CONTRIBUTING.md) for information on adding a11y testing for any new components added.

## Contributing

Please check out our [Contribution Guidelines](CONTRIBUTING.md) for detailed information on how you can lend a hand.