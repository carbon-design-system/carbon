# Bluemix Components

**A themeable library of re-usable components for building websites and UIs.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable components they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent HTML, CSS, and JavaScript in as many places as possible in their prototype and production work.

## Changelog

### Version 0.0.9 (Latest)

*Updated on 9/9/2015: Browse [repo](https://github.ibm.com/Bluemix/pattern-library/tree/f9707fb5c786f53f49bfe1531926d38fe95ec668) at this point in history.*

#### Components
- Add atlas-cards

- Update button sizing
  - font-size smaller (14px or .875em)
  - height shorter (44px or 2.75em)
  - min-width smaller (6em or 96px)

- Update behavior and styles for modal
  - Use CSS :target selector to reveal modal
  - Update styles for mobile-first design


View all previous [CHANGELOG.md](https://github.ibm.com/Bluemix/pattern-library/blob/master/PATCHNOTES.md) for changes to the Pattern Library.

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
├── buttons
│   ├── _buttons.scss
│   └── html
│       ├── close-button.html
│       ├── danger-button.html
│       ├── primary-button.html
│       ├── secondary-button.html
│       ├── tertiary-button.html
│       └── warning-button.html
├── cards
│   ├── _atlas-card.scss
│   ├── _cards.scss
│   └── html
│       ├── atlas-card.html
│       └── card.html
├── dropdown
│   ├── _dropdown.scss
│   ├── html
│   │   └── dropdown.html
│   └── js
│       └── dropdown.js
├── forms
│   ├── _forms.scss
│   └── html
│       └── form.html
├── links
│   ├── _links.scss
│   └── html
│       └── content-link.html
├── lists
│   ├── _lists.scss
│   └── html
│       ├── card-list.html
│       ├── nested-list.html
│       ├── ordered-list.html
│       └── unordered-list.html
├── modals
│   ├── _modals.scss
│   └── html
│       └── modal.html
├── nav
│   ├── _atlas-global-header.scss
│   ├── _nav.scss
│   ├── html
│   │   ├── atlas-global-header.html
│   │   ├── global-nav.html
│   │   └── secondary-nav.html
│   └── js
│       ├── atlas-global-header.js
│       └── global-nav.js
├── radio
│   ├── _radio.scss
│   └── html
│       └── radio.html
├── tables
│   ├── _tables.scss
│   └── html
│       └── table.html
└── tooltips
    ├── _tooltips.scss
    └── html
        └── tooltip.html

24 directories, 38 files
```
