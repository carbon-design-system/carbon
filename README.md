# Bluemix Components

**Component library for building websites and UIs for Atlas/Bluemix.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable HTML and Sass partials they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent markup, styles, and behavior in their prototype and production work.

Bluemix Components comes bundled with these dependencies:

- [IBM Design Colors](https://github.com/IBM-Design/colors): A SCSS file with IBM Design Colors.
- [Bluemix Icons](https://github.ibm.com/Bluemix/bluemix-icons): A SCSS file with icon classes using SVG.

## Contributing

### Requirements

* SSH Key for GitHub Enterprise account
* node.js 4 or higher

Contributing to bluemix-components requires that you can run this repo locally on your computer.

Please read the [Generating SSH Keys](https://help.github.com/articles/generating-ssh-keys/) article from GitHub for steps on how to set-up your **SSH key**.

You must have **node.js 4 or higher** in order to run this project locally on your computer.

It's recommended to use [`nvm` (node version manager)](https://github.com/creationix/nvm) to use the latest version of `node.js` (4 or higher).

Detailed steps as well as our guidelines can be found in [CONTRIBUTING.md](./CONTRIBUTING.md).

## Install

### Requirements

* SSH Key for GitHub Enterprise account
* `git`
* `bower`

To install bluemix-components with `bower`, you must have your **SSH key** set-up with your GitHub Enterprise account.

Please read the [Generating SSH Keys](https://help.github.com/articles/generating-ssh-keys/) article from GitHub for steps on how to set-up your SSH key.

Install `bower` globally:

```
npm install -g bower
```

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
bower install bluemix-components --save
```

If you are on a Unix-based system (such as on a Mac), you can do the above four steps in one step by typing the following into your terminal:

```bash
+touch .bowerrc && echo '{ "registry": "http://x1showcase.emmlabs.ibm.com:5678/" }' > .bowerrc && bower init && bower install bluemix-components --save
```

## Usage

See [examples/getting-started](https://github.ibm.com/Bluemix/bluemix-components/tree/master/examples/getting-started) for how to:
* Set up Bluemix Components
* How to compile SCSS with gulp or grunt
* Setting up Fonts Directory (temporary)
