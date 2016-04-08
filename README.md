# Bluemix Components

**Component library for building websites and UIs for Atlas/Bluemix.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable HTML and Sass partials they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent markup, styles, and behavior in their prototype and production work.

Bluemix Components comes bundled with these dependencies:

- [IBM Design Colors](https://github.com/IBM-Design/colors): A SCSS file with IBM Design Colors.
- [Bluemix Icons](https://github.ibm.com/Bluemix/bluemix-icons): A SCSS file with icon classes using SVG.

## Install

#### Bower (recommended)

Set up your SSH key on GitHub Enterprise, see [Generating SSH Keys - GitHub](https://help.github.com/articles/generating-ssh-keys/).

Install `bower` globally:

```
npm install -g bower
```

> **Mac & Unix users:** you can do the below four steps all at once - copy and paste the following into your terminal:

> ```bash
touch .bowerrc && echo '{ "registry": "http://x1showcase.emmlabs.ibm.com:5678/" }' > .bowerrc && bower init && bower install bluemix-components --save
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

#### Download

Go to [releases](https://github.ibm.com/Bluemix/bluemix-components/releases), find the version you want to use and download the source code as a `.zip` or `tar.gz` file.

![download-gif](https://media.github.ibm.com/user/76/files/159ed244-fdb9-11e5-9809-f7cd22e36217)



## Usage

See [examples/getting-started](https://github.ibm.com/Bluemix/bluemix-components/tree/master/examples/getting-started) for how to:
* Set up Bluemix Components
* How to compile SCSS with gulp or grunt
* Setting up Fonts Directory (temporary)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
