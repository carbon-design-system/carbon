# Bluemix Pattern Library

**A themeable library of re-usable patterns for building websites and UIs.**

The Bluemix Pattern Library gives developers (FEDs & Engineers) a collection of re-usable patterns they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent HTML, CSS, and JavaScript in as many places as possible in their prototype and production work.

## Warning!

This package is in *very* **early stages of development**.

IBMers, please visit our GitHub Enterprise repo (search bluemix pattern-library) to learn how you can contribute.

## Install

Make sure you have node and npm installed.

```bash
# terminal
npm install bluemix-pattern-library -D
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
<body>
  <button class="bx-btn--primary" type="button">primary button</button>
</body>
</html>
```



## Dependencies

By default, this library will reflect the visual design of IBM Bluemix. If you need different colors or typography styles, you will be enabled to do so.

For right now, you will only be able to use Bluemix colors and typography.

Here are the dependencies:

- [bluemix-colors](https://www.npmjs.com/package/bluemix-colors): A palette of Bluemix colors based on [IBM-Design/colors](https://github.com/IBM-Design/colors)
- [bluemix-typography](https://www.npmjs.com/package/bluemix-typography): Typography functions, variables and fonts that are commonly used in Bluemix.


## Usable-ish

- buttons
- cards

## Priority To-do List

These are patterns that are in common with sp-styleguide. Define HTML, styles and JavaScript for these patterns first.

- [tables](http://pages.design.ibm.com/bluemix/sp-styleguide/master/index.html#tables-and-menus)
- [nav](http://pages.design.ibm.com/bluemix/sp-styleguide/master/index.html#main-nav)
- [modals (dialog-box)](http://pages.design.ibm.com/bluemix/sp-styleguide/master/index.html#messaging)
- [links](http://pages.design.ibm.com/bluemix/sp-styleguide/master/index.html#typography)
