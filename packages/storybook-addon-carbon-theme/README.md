# @carbon/storybook-addon-theme

> Carbon theme switcher for Storybook

## Getting started

To install `@carbon/storybook-addon-theme` in your project, you will need to run
the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/storybook-addon-theme
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/storybook-addon-theme
```

## Usage

`.storybook/main.js`:

```js
module.exports = {
  addons: ['@carbon/storyboook-addon-theme'],
};
```

Use with a feature flag switch is possible if you construct the addons array.

```js
const addons = [
  /* other addons */
];

if (process.env.CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES === 'true') {
  addons.push('@carbon/storybook-addon-theme');
}

module.exports = {
  addons,
  stories: ['../src/**/*-story.js', '../src/**/*.stories.mdx'],
};
```

### Global Decorator

```js
import { withCarbonTheme } from '@carbon/storybook-addon-theme'; // for React
// import { withCarbonTheme } from '@carbon/storybook-addon-theme/vue'; // for Vue
// for Angular
// .
// .
// .
addDecorator(withCarbonTheme);
// .
// .
// .
addParameters({
  // optional
  carbonTheme: {
    theme: 'g10', // optional default carbon theme
    themes: ['g10', 'g90'], // optional carbonTheme filter
  },
});
```

within your stories:

```js
import { withCarbonTheme } from '@carbon/storybook-addon-theme'; // for React
// import { withCarbonTheme } from '@carbon/storybook-addon-theme/vue'; // for Vue
// for Angular
// .
// .
// .
storiesOf('Component', module)
  .addDecorator(withCarbonTheme)
  .add(() => story, {
    carbonTheme: {
      // optional
      theme: 'g10', // optional default carbon theme
      themes: ['g10', 'g90'], // optional carbonTheme filter (additive to global)
    },
  });
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
