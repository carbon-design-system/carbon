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
  addons: ['@carbon/storybook-addon-theme/register'],
};
```

Use with a feature flag switch is possible if you construct the addons array.

```js
const addons = [
  /* other addons */
];

if (process.env.CARBON_REACT_STORYBOOK_USE_CUSTOM_PROPERTIES === 'true') {
  addons.push('@carbon/storybook-addon-theme/register');
}

module.exports = {
  addons,
  stories: ['../src/**/*-story.js', '../src/**/*.stories.mdx'],
};
```

### Global Decorator

`.storybook/preview.js`:

```js
import { withCarbonTheme } from '@carbon/storybook-addon-theme'; // for React
// import { withCarbonTheme } from '@carbon/storybook-addon-theme/vue'; // for Vue
// for Angular (not yet supported)
// .
// for all (including story decorators)
import index from './index.scss';
// .
addDecorator(withCarbonTheme);
// .
```

```js
// Adding the decorator
const decorators = [withCarbonTheme];
const parameters = {
  carbonTheme: {
    theme: 'g10',
  },
};
export { decorators, parameters };
```

```js
// Older storybook versions
addParameters({
  // optional
  carbonTheme: {
    theme: 'g10', // optional default carbon theme
    themes: ['g10', 'g90'], // optional carbonTheme filter
  },
});
```

### Story decorator

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

## SCSS

`.storybook/index.scss`

```scss
@import '@carbon/themes/scss/themes';

:root {
  @include carbon--theme(
    $theme: $carbon--theme--white,
    $emit-custom-properties: true
  );
}

:root[storybook-carbon-theme='g10'] {
  @include carbon--theme(
    $theme: $carbon--theme--g10,
    $emit-custom-properties: true
  );
}

:root[storybook-carbon-theme='g90'] {
  @include carbon--theme(
    $theme: $carbon--theme--g90,
    $emit-custom-properties: true
  );
}

:root[storybook-carbon-theme='g100'] {
  @include carbon--theme(
    $theme: $carbon--theme--g100,
    $emit-custom-properties: true
  );
}
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
