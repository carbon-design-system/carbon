# Bluemix Components

**A themeable library of re-usable components for building websites and UIs.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable components they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent HTML, CSS, and JavaScript in as many places as possible in their prototype and production work.

## Install

Installing Bluemix Components comes bundled with these dependencies:

- [bluemix-colors](): A scss file with a palette of Bluemix colors based on [IBM-Design/colors](https://github.com/IBM-Design/colors)
- [bluemix-typography](): A scss file with typography-related functions, classes, and extends.
- [bluemix-icons](): A scss file with icon classes using SVG.

**Bower (recommended)**:

Initialize a **bower.json** file:
```bash
bower init
```

Create a **.bowerrc** file:
```json
{ "registry": "http://x1showcase.emmlabs.ibm.com:5678/" }
```

Install the bower package:

```bash
bower install bluemix-components --save-dev
```

Create a **main.scss** file in your project and `@import` bluemix-components with a relative path to the bower package.

You can also configure your **.bowerrc** file to install bluemix-components and other bower packages in another directory. Please see refer to [bower/spec](https://github.com/bower/spec/blob/master/config.md#directory) docs.

**NPM** (Currently out-of-date):

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
<body class="light-ui">
  <button class="btn--primary" type="button">primary button</button>
</body>
</html>
```
- Make sure to add `light-ui` or `dark-ui` class to the `<body>` tag (not working yet).

**Pick and choose styles you need**:

*docs coming soon*
