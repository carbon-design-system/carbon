# @carbon/icons-web-components

> Web components for icons in digital and software products using the Carbon
> Design System

## Getting started

To install `@carbon/icons-web-components` in your project, you will need to run
the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons-web-components
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/icons-web-components
```

## Usage

This package provides optimized lit-html icon components for use in web
components. Each icon is a function that returns a lit-html template result.

```javascript
import { Add16 } from '@carbon/icons-web-components';

// Use in a lit-html template
render() {
  return html`
    <div>
      ${Add16({ class: 'my-icon' })}
    </div>
  `;
}
```

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
