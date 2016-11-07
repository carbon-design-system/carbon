[![Build Status](https://travis.ibm.com/Bluemix/bluemix-components-react.svg?token=rxygQXh19ShfmuUT1G3v&branch=master)](https://travis.ibm.com/Bluemix/bluemix-components-react)
[![Coverage Status](https://pages.github.ibm.com/Bluemix/bluemix-components-react/coverage/badge.svg)](https://pages.github.ibm.com/Bluemix/bluemix-components-react/coverage/lcov-report/index.html)

# Bluemix Components React

A set of React Components that implements [Bluemix Components](https://github.ibm.com/Bluemix/bluemix-components) from [Bluemix Design System](http://design-system.stage1.mybluemix.net/)

View available React Components [here](https://pages.github.ibm.com/Bluemix/bluemix-components-react/). Usage information is available when you click the blue **?** icon in the top right corner of the selected component.

## Getting Started
Bluemix Components React is published to a private npm registry maintained by Bluemix Ops Console team.

1. Before installing with npm,
you must create an **.npmrc** file - you can create this in the root of your project folder or on your computer's **~** directory.

  ```
  $ touch .npmrc
  ```

  Next, write the following into your **.npmrc** file:

  ```
  //dev-console-npm.stage1.ng.bluemix.net/:_authToken="u6vjQywpRv51/eKBiRcAFA=="
  @console:registry=https://dev-console-npm.stage1.ng.bluemix.net/
  ```

  If you haven't done so already, create a **package.json** for your project:

  ```
  $ npm init
  ```

2. Install bluemix-components-react with `npm`.

  ```
  $ npm install --save @console/bluemix-components-react
  ```

3. These components require the use of
[Webpack](http://webpack.github.io/docs/tutorials/getting-started/) in your project.
See [webpack.config.js](https://github.ibm.com/Bluemix/bluemix-components-react/blob/master/.storybook/webpack.config.js) for an example config.

  The following dependencies are required and can be installed with `npm`.

  - `json-loader`
  - `postcss-loader`
  - `sass-loader`
  - `style-loader`
  - `css-loader`
  - `node-sass`

4. Example Usage
  ```
  import { Loading } from '@console/bluemix-components-react';
  ReactDOM.render(
    <Loading className="example-loading" />,
    document.getElementById('example-container')
  );
  ```

## Contributing

Please refer to our [Contributing Guidelines](https://github.ibm.com/Bluemix/bluemix-components-react/blob/master/CONTRIBUTING.md).
