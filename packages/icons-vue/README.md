# @carbon/icons-vue

> Vue components for icons in digital and software products using the Carbon
> Design System

## Getting started

To install `@carbon/icons-vue` in your project, you will need to run the
following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons-vue
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/icons-vue
```

## Usage

Icons in this package support the following sizes: `16`, `20`, `24`, and `32`
pixels. These sizes refer to the width and height of the icon.

You can install these components from `@carbon/icons-vue` through two ways. The
first is to install them when you're initializing your Vue app. For example:

```js
import { CarbonIconsVue } from '@carbon/icons-vue';
import Bee32 from '@carbon/icons-vue/es/bee/32';
import Vue from 'vue';
import App from './App.vue';

Vue.use(CarbonIconsVue, {
  components: {
    Bee32,
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

_Note: if you would like to find the import path for an icon, you can reference
our [icon preview](https://carbon-elements.netlify.com/icons/examples/preview/)_

Using `CarbonIconsVue` we can pass in any of the icon components that we'd like
to use. In our application, we can then use them by doing:

```vue
<template>
  <Bee32 />
</template>
```

If you would rather not register icons globally, you can also import them into
individual components.

```js
import Bee32 from '@carbon/icons-vue/es/bee/32';

export default {
  name: 'MyComponent',
  component: {
    Bee32,
  },
};
```

You can pass in props to any icon component for things like accessibility
labels, custom classes, event handlers, and more. For example:

```vue
<template>
  <Bee32 aria-label="Bee" class="custom-class" v-on:click="handler" />
</template>
```

## 📚 Examples

If you're looking for more examples on how to use `@carbon/icons-vue`, we have
some examples that you can check out:

- [vue-cli](./examples/vue-cli)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect metrics data. By installing this
package as a dependency you are agreeing to telemetry collection. To opt out,
see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
