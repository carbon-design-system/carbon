# `@carbon/icons-react`

> React components for icons in digital and software products using the Carbon
> Design System.

## Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons-react
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @carbon/icons-react
```

## Usage

Icons in this package support the following sizes: `16`, `20`, `24`, and `32`
pixels. These sizes refer to the width and height of the icon. You can import an
icon component into your project by doing one of the following:

```jsx
// Do this if your bundler supports tree-shaking, otherwise prefer the full-path
// import since importing the main bundle will cause you to distribute the full
// 600kb bundle
import { Add24 } from '@carbon/icons-react';

// If you want to guarantee that you're only importing the exact icon
import Add24 from '@carbon/icons-react/lib/Add/24';
```

We also provide CommonJS and UMD files in the `lib` and `umd` directories,
respectively.

To import using CommonJS, you can do the following:

```js
const Add24 = require('@carbon/icons-react/lib/Add/24');
```

## 🤲 Contributing

Looking to contribute? You should start [here](../../.github/CONTRIBUTING.md)!
