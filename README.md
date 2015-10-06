# Bluemix Components

**A themeable library of re-usable components for building websites and UIs.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable components they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent HTML, CSS, and JavaScript in as many places as possible in their prototype and production work.

## Install

### Bower

```
bower install bluemix-components --save-dev
```

### NPM
```
npm install bluemix-components -D
```

Create a **main.scss** file in your project and `@import` bluemix-pattern-library with a relative path to the node module.

```scss
// main.scss
@import 'path/to/node_modules/bluemix-pattern-library/dist/pattern-library';
```

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
- Make sure to add `bx-light` or `bx-dark` class to the body tag.

## Dependencies

By default, this library will reflect the visual design of IBM Bluemix. If you need different colors or typography styles, you will be enabled to do so.

For right now, you will only be able to use Bluemix colors and typography.

Here are the dependencies:

- [bluemix-colors](https://www.npmjs.com/package/bluemix-colors): A palette of Bluemix colors based on [IBM-Design/colors](https://github.com/IBM-Design/colors)
- [bluemix-typography](https://www.npmjs.com/package/bluemix-typography): Typography functions, variables and fonts that are commonly used in Bluemix.

## Components Folders and Files
```bash
dev/components
├── buttons
│   ├── html
│   │   ├── close-button.html
│   │   ├── danger-button.html
│   │   ├── primary-button.html
│   │   ├── secondary-button.html
│   │   ├── tertiary-button.html
│   │   └── warning-button.html
│   └── scss
│       └── _buttons.scss
├── cards
│   ├── html
│   │   ├── atlas-card.html
│   │   └── card.html
│   └── scss
│       └── _cards.scss
├── forms
│   ├── html
│   │   ├── form-group.html
│   │   └── form.html
│   └── scss
│       └── _forms.scss
├── links
│   ├── html
│   │   └── content-link.html
│   └── scss
│       └── _links.scss
├── lists
│   ├── html
│   │   ├── card-list.html
│   │   ├── nested-list.html
│   │   ├── ordered-list.html
│   │   └── unordered-list.html
│   └── scss
│       └── _lists.scss
├── modals
│   ├── html
│   │   └── modal.html
│   └── scss
│       └── _modals.scss
├── nav
│   ├── html
│   │   ├── atlas-global-header.html
│   │   ├── global-nav.html
│   │   └── secondary-nav.html
│   ├── js
│   │   ├── _atlas-global-header.js
│   │   └── _global-nav.js
│   └── scss
│       └── _nav.scss
├── search
│   ├── html
│   │   └── search.html
│   └── scss
│       └── _search.scss
├── select
│   ├── html
│   │   └── select.html
│   ├── js
│   │   └── _select.js
│   └── scss
│       └── _select.scss
├── tables
│   ├── html
│   │   └── table.html
│   └── scss
│       └── _tables.scss
├── textfields
│   ├── html
│   │   ├── textarea.html
│   │   └── textfield.html
│   └── scss
│       ├── _textarea.scss
│       └── _textfield.scss
├── toggles
│   ├── html
│   │   ├── checkbox.html
│   │   └── radio.html
│   └── scss
│       ├── _checkbox.scss
│       └── _radio.scss
└── tooltips
    ├── html
    │   └── tooltip.html
    └── scss
        └── _tooltips.scss

41 directories, 45 files
```
