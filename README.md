# Carbon Components React

[![Build Status](https://travis-ci.org/carbon-design-system/carbon-components-react.svg?branch=master)](https://travis-ci.org/carbon-design-system/carbon-components-react)

**React component library for building websites and UIs with Carbon**

This repository provides a collection of [Carbon Components](https://github.com/carbon-design-system/carbon-components) implemented using [React](https://facebook.github.io/react/).

## Usage

### List of Available Components

View available React Components [here](https://react.carbondesignsystem.com). Usage information is available when you click the blue **?** icon in the top right corner of the selected component.

### Getting Started

```
npm install -S carbon-components-react carbon-components carbon-icons
```

1. These components require the use of [Webpack](http://webpack.github.io/docs/tutorials/getting-started/) in your project. See our [`webpack.config.js`](/.storybook/webpack.config.js) for an example configuration.

2. Components do not import any of the styles themselves, use the scss or css from `carbon-components` to bring in styling. You can also use the `unpkg` cdn to bring in the styles wholesale - `unpkg.com/carbon-components/css/carbon-components.css` aliases the latest css file.

## Development

Please refer to the [Contribution Guidelines](CONTRIBUTING.md) before starting any work.

### Using the server

We recommend the use of [React Storybook](https://github.com/storybooks/react-storybook) for developing components.

1. Start the server:

	```
	$ npm run storybook
	```

2. Open browser to `http://localhost:8080/`.

3. Develop components in their respective folders (`/components` or `/internal`).

4. Write stories for your components in `/.storybook`.

## Contributing

Please check out our [Contribution Guidelines](CONTRIBUTING.md) for detailed information on how you can lend a hand.
