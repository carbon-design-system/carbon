# Bluemix Components

**A themeable library of re-usable components for building websites and UIs.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable components they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent HTML, CSS, and JavaScript in as many places as possible in their prototype and production work.

## Install

Installing Bluemix Components will automatically give you access to these dependencies:

- [bluemix-colors](https://www.npmjs.com/package/bluemix-colors): A scss file with a palette of Bluemix colors based on [IBM-Design/colors](https://github.com/IBM-Design/colors)
- [bluemix-typography](https://www.npmjs.com/package/bluemix-typography): A scss file with typography-related functions, classes, and extends.

**Bower**:

Initialize a **bower.json** file:
```bash
bower init
```

Create a **.bowerrc** file:
```json
{ "registry": "http://bower.stage1.mybluemix.net/" }
```

Install the bower package:

```bash
bower install bluemix-components --save-dev
```

Create a **main.scss** file in your project and `@import` bluemix-components with a relative path to the bower package.

You can also configure your **.bowerrc** file to install bluemix-components and other bower packages in another directory. Please see refer to [bower/spec](https://github.com/bower/spec/blob/master/config.md#directory) docs.

**NPM**:

Initialize a **package.json** file:
```bash
npm init
```

Install:

```bash
npm install bluemix-components -D
```

```scss
// main.scss
@import 'path/to/node_modules/bluemix-pattern-library/dist/pattern-library';
```

Create a **main.scss** file in your project and `@import` bluemix-components with a relative path to the **node_modules**.

## Usage

**Using all styles from Bluemix Components**:

Compile your **main.scss** file with something (Gulp.js, Grunt, etc.) and you'll get a **main.css** file with all the compiled Sass.

In your **index.html**, link to the **main.css** file and start writing a pattern using markup, classes and attributes.

Here's an example.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Pattern Library Dev</title>
  <link rel="stylesheet" href="main.css">
</head>
<body class="bx-light">
  <button class="btn--primary" type="button">primary button</button>
</body>
</html>
```
- Make sure to add `light-ui` or `dark-ui` class to the `<body>` tag (not working yet).

**Pick and choose styles you need**:

*docs coming soon*

## Components Folders and Files
```bash
dev/components
├── buttons
│   ├── _buttons.scss
│   ├── close-button.html
│   ├── danger-button.html
│   ├── primary-button.html
│   ├── secondary-button.html
│   ├── tertiary-button.html
│   └── warning-button.html
├── cards
│   ├── _cards.scss
│   ├── atlas-card.html
│   └── card.html
├── forms
│   ├── _forms.scss
│   ├── form-group.html
│   └── form.html
├── links
│   ├── _links.scss
│   └── link.html
├── lists
│   ├── _lists.scss
│   ├── card-list.html
│   ├── nested-list.html
│   ├── ordered-list.html
│   └── unordered-list.html
├── modals
│   ├── _modals.scss
│   └── modal.html
├── navigation
│   ├── _nav.scss
│   └── nav.html
├── search
│   ├── _search.js
│   ├── _search.scss
│   └── search.html
├── selects
│   ├── _select.js
│   ├── _select.scss
│   └── select.html
├── tables
│   ├── _tables.scss
│   └── table.html
├── textfields
│   ├── _text-area.scss
│   ├── _text-field.scss
│   ├── text-area.html
│   └── text-field.html
├── toggles
│   ├── _checkbox.scss
│   ├── _radio.scss
│   ├── checkbox.html
│   └── radio.html
└── tooltips
    ├── _tooltips.scss
    └── tooltip.html

13 directories, 42 files
```
