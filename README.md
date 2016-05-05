# Bluemix Components

[![Build Status](https://travis.innovate.ibm.com/Bluemix/bluemix-components.svg?token=PscWax4p1FECdA5aCxvd&branch=master)](https://travis.innovate.ibm.com/Bluemix/bluemix-components)

**Component library for building websites and UIs for Atlas/Bluemix.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable HTML and Sass partials they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent markup, styles, and behavior in their prototype and production work.

## Install

#### Bower (recommended)

Set up your SSH key on GitHub Enterprise, see [Generating SSH Keys - GitHub](https://help.github.com/articles/generating-ssh-keys/).

Install `bower` globally:

```
npm install -g bower
```

> **Mac & Unix users:** you can do the below four steps all at once - copy and paste the following into your terminal:

> ```sh
touch .bowerrc && echo '{ "registry": "http://9.37.228.216:5678/" }' > .bowerrc && bower init && bower install bluemix-components --save
```

Initialize a **bower.json** file:
```bash
bower init
```

Create a **.bowerrc** file:
```json
{ "registry": "http://9.37.228.216:5678/" }
```

Install the bower package:

```sh
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
