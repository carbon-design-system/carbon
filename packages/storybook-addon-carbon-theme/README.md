# Storybook addon for Carbon themes

This addon for storybook allows you to change the theme used with Carbon
Components!

## Supports

- React
- Vue

## Install

```sh
npm install @carbon/storybook-addon-theme
```

## Requirements

- Use of Carbon Components
- Use of Custom CSS Properties feature flag

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
