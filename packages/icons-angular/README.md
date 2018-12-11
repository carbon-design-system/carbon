# @carbon/icons-angular

> Angular components for icons in digital and software products using
> the Carbon Design System

## Getting started

To install `@carbon/icons-angular` in your project, you will need to
run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons-angular
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following
command instead:

```bash
yarn add @carbon/icons-angular
```

## Usage

Icons in this package support the following sizes: `16`, `20`, `24`,
and `32` pixels. These sizes refer to the width and height of the
icon. You can use an icon component into your project by doing the
following:

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

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new
features, or help us improve the project documentation. If you're
interested, definitely check out our [Contributing Guide](/.github/CONTRIBUTING.md)
! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
