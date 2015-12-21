# Bluemix Components

**Component library for building websites and UIs for Atlas/Bluemix.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable HTML and Sass partials they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent markup, styles, and behavior in their prototype and production work.

## Install

Installing Bluemix Components comes bundled with these dependencies:

- [IBM-Design/colors](https://github.com/IBM-Design/colors): A SCSS file with IBM Design Colors.
- [bluemix-icons](https://github.ibm.com/Bluemix/bluemix-icons): A SCSS file with icon classes using SVG.

**Bower**:

Requirements:
* NPM: [Installer](https://nodejs.org/en/) / [Homebrew](http://blog.teamtreehouse.com/install-node-js-npm-mac)
* Bower: `npm install -g bower`

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

Create a **main.scss** file in your project and `@import` bluemix-components with a relative path to the bower package.

If using bower_components folder:
```scss
@import 'bower_components/bluemix-components/styles';
```

You can also configure your **.bowerrc** file to install bluemix-components and other bower packages in another directory. See [bower/spec](https://github.com/bower/spec/blob/master/config.md#directory) docs for details.

**NPM** (Deprecated until we get NPM Enterprise)

## Usage

*docs coming soon*
