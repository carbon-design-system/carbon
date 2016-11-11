[![Build Status](https://travis.ibm.com/Bluemix/bluemix-components-react.svg?token=rxygQXh19ShfmuUT1G3v&branch=master)](https://travis.ibm.com/Bluemix/bluemix-components-react)
[![Coverage Status](https://pages.github.ibm.com/Bluemix/bluemix-components-react/coverage/badge.svg)](https://pages.github.ibm.com/Bluemix/bluemix-components-react/coverage/lcov-report/index.html)

# Bluemix Components React

**React component library for building websites and UIs for Atlas/Bluemix.**

This repository provides a collection of [Bluemix Components](https://github.ibm.com/Bluemix/bluemix-components) implemented using [React](https://facebook.github.io/react/). All of the components align with the latest UI given by [Bluemix Design System](http://design-system.stage1.mybluemix.net/).

## Usage

### List of Available Components

View available React Components [here](https://pages.github.ibm.com/Bluemix/bluemix-components-react/). Usage information is available when you click the blue **?** icon in the top right corner of the selected component.

### Getting Started

Bluemix Components React is published on a private npm registry maintained by the Bluemix Ops Console team.

1. Create the following `.npmrc` file in your project folder:

  ```
  //dev-console-npm.stage1.ng.bluemix.net/:_authToken="u6vjQywpRv51/eKBiRcAFA=="
  @console:registry=https://dev-console-npm.stage1.ng.bluemix.net/
  ```

2. If you haven't done so already, create a `package.json` for your project:

  ```
  $ npm init
  ```

3. Install `bluemix-components-react` via npm:

  ```
  $ npm install --save @console/bluemix-components-react
  ```

4. These components require the use of [Webpack](http://webpack.github.io/docs/tutorials/getting-started/) in your project. See our [`webpack.config.js`](/.storybook/webpack.config.js) for an example configuration.

5. Example usage:

  ```
  import { Loading } from '@console/bluemix-components-react';
  ReactDOM.render(
    <Loading className="example-loading" />,
    document.getElementById('example-container')
  );
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

## Contributing

Please check out our [Contribution Guidelines](CONTRIBUTING.md) for detailed information on how you can lend a hand.

## Examples

Here is a list of projects found that use `bluemix-components-react`:

- [MLASS Bluemix Dashboard](https://github.ibm.com/NGP-TWC/mlaas-dashboard)
- [Panorama](https://github.ibm.com/itsmui/panoconsole)
- [Bluemix UnifiedSupport](https://github.ibm.com/gordonj/Bluemix.UnifiedSupport)
- [OMaaS UI](https://github.ibm.com/OMaaS/event-analytics-ui)
