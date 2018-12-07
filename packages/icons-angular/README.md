# `@carbon/icons-angular`

> Angular components for icons in digital and software products using the Carbon
> Design System.

## Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons-angular
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @carbon/icons-angular
```

## Usage

Icons in this package support the following sizes: `16`, `20`, `24`, and `32`
pixels. These sizes refer to the width and height of the icon. You can use an
icon component into your project by doing the following:

In your module:

```ts
import { IconModule } from '@carbon/icons-angular';

@NgModule({
  // ...
  imports: [
    // ...
    IconModule,
    // ...
  ],
  // ...
})
export class MyModule {}
```

In your component template:

```html
<!-- ... -->
<ibm-icon-add32></ibm-icon-add32>
<!-- ... -->
```

## 🤲 Contributing

Looking to contribute? You should start [here](../../.github/CONTRIBUTING.md)!
