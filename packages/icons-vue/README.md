# `@carbon/icons-vue`

> Vue components for icons in digital and software products using the Carbon
> Design System.

## Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons-vue
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @carbon/icons-vue
```

## Usage

Icons in this package support the following sizes: `16`, `20`, `24`, and `32`
pixels. These sizes refer to the width and height of the icon.

You can install these components from `@carbon/icons-vue` through two ways. The
first is to install them when you're initializing your Vue app. For example:

```js
import { CarbonComponentsVue, Bee32 } from '@carbon/icons-vue';
import Vue from 'vue';
import App from './App.vue';

Vue.use(CarbonComponentsVue, {
  components: {
    Bee32,
  },
});

new Vue({
  render: h => h(App),
}).$mount('#app');
```

Using `CarbonComponentsVue` we can pass in any of the icon components that we'd
like to use. In our application, we can then use them by doing:

```vue
<template>
  <Bee32 />
</template>
```

You can pass in props to any icon component for things like accessibility
labels, custom classes, event handlers, and more. For example:

```vue
<template>
  <Bee32 aria-label="Bee" class="custom-class" v-on:click="handler" />
</template>
```

## 🤲 Contributing

Looking to contribute? You should start [here](../../.github/CONTRIBUTING.md)!
