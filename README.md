# Bluemix Components React

A set of React Components that implements [Bluemix Components](https://github.ibm.com/Bluemix/bluemix-components) from [Bluemix Design System](http://design-system.stage1.mybluemix.net/)

View available React Components [here](https://pages.github.ibm.com/Bluemix/bluemix-components-react/).

## Getting Started

> NPM package for `bluemix-components-react` is coming soon.

Requires the use of 
[Webpack](http://webpack.github.io/docs/tutorials/getting-started/) and the following dependencies below. 
See [webpack.config.js](https://github.ibm.com/Bluemix/bluemix-components-react/blob/master/.storybook/webpack.config.js) for details.

All dependencies can be installed with `npm`.

- `json-loader`
- `postcss-loader`
- `sass-loader`
- `style-loader`
- `css-loader`
- `node-sass`

## Contributing

First: Fork the repo, Clone your Fork and install dependencies with `npm`

```sh
npm install
```

Start dev server (which uses [React Storybook](https://github.com/kadirahq/react-storybook)):

```sh
npm run storybook
```

Open browser to [http://localhost:9001/](http://localhost:9001/) and develop components in [.storybook](https://github.ibm.com/Bluemix/bluemix-components-react/tree/master/.storybook) folder.

## Run tests

```sh
npm run test
```

## Run linting

```sh
npm run lint
```

## Run lint and tests

```sh
npm run check
```

## Deploy react-storybook to gh-pages

```sh
npm run deploy
```
