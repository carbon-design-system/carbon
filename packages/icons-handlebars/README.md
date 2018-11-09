# `@carbon/icons-handlebars`

> Handlebars helpers for using icons from the IBM Design Language.

## Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/icons-handlebars
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @carbon/icons-handlebars
```

After installing, you can register the helper by doing the following:

```js
const handlebars = require('handlebars');
const helper = require('@carbon/icons-handlebars');

// You can call the helper directly to register it
helper({ handlebars });
```

In addition, you can import the helper and register it manually:

```js
const handlebars = require('handlebars');
const { iconHelper } = require('@carbon/icons-handlebars');

handlebars.registerHelper('carbon-icon', iconHelper);
```

## Usage

You can use the `carbon-icon` helper by passing in the name of the icon you'd
like to render. For example:

```hbs
{{ carbon-icon "Accessibility32" }}
```

This will output the default `<svg>` markup for the `Accessibility` icon at
32x32. You can pass in additional properties like `aria-label` by doing:

```hbs
{{ carbon-icon "Accessibility32" aria-label="Accessibility label" }}
```

These attributes will be applied to the top-level `<svg>` node.

## 🤲 Contributing

Looking to contribute? You should start [here](../../.github/CONTRIBUTING.md)!
