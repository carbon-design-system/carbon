# Bluemix Components

**Component library for building websites and UIs for Atlas/Bluemix.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable HTML and Sass partials they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent markup, styles, and behavior in their prototype and production work.

Bluemix Components comes bundled with these dependencies:

- [IBM Design Colors](https://github.com/IBM-Design/colors): A SCSS file with IBM Design Colors.
- [Bluemix Icons](https://github.ibm.com/Bluemix/bluemix-icons): A SCSS file with icon classes using SVG.

## Requirements:

You must have `node.js`, `npm` and `bower`.
If you're contributing to this repo, it's recommended to use [`nvm` (node version manager)](https://github.com/creationix/nvm) and the latest version of `node.js` (4 or higher).

Install `bower` globally:

```
npm install -g bower
```

## Installation

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
bower install bluemix-components'#'3.0.1-alpha --save
```

## Usage

See [examples/getting-started](https://github.ibm.com/Bluemix/bluemix-components/tree/master/examples/getting-started) for how to:
* Set up Bluemix Components
* How to compile SCSS with gulp or grunt
* Setting up Fonts Directory (temporary)
