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

## 🤲 Contributing

Looking to contribute? You should start [here](../../.github/CONTRIBUTING.md)!
