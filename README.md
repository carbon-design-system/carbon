# Bluemix Components

[![Build Status](https://travis.innovate.ibm.com/Bluemix/bluemix-components.svg?token=PscWax4p1FECdA5aCxvd&branch=master)](https://travis.innovate.ibm.com/Bluemix/bluemix-components)

**Component library for building websites and UIs for Atlas/Bluemix.**

Bluemix Components gives developers (FEDs & Engineers) a collection of re-usable HTML and Sass partials they can use for building websites and user-interfaces for Bluemix.

The aim is for every developer to use consistent markup, styles, and behavior in their prototype and production work.

## Install

#### Bower

> **Before Install:** Set up your SSH key on GitHub Enterprise, see [Generating SSH Keys - GitHub](https://help.github.com/articles/generating-ssh-keys/).

> Install `bower` globally:

> ```
npm install -g bower
```

> **Mac & Unix Shortcut:** you can do the below four steps all at once - copy and paste the following into your terminal:

> ```sh
touch .bowerrc && echo '{ "registry": "http://9.37.228.216:5678/" }' > .bowerrc && bower init && bower install bluemix-components --save
```

> Initialize a **bower.json** file:
```bash
bower init
```

> Create a **.bowerrc** file:
```json
{ "registry": "http://9.37.228.216:5678/" }
```

Install the bower package:

```sh
bower install bluemix-components --save
```

#### NPM

> **Before Install**: Bluemix Components is also available on the ops-console registry as a private npm package.
> Create an `.npmrc` file in the root of your project directory (or on your computer's `~` directory):
> ```
cd ~ && touch .npmrc
```
> Write the following config into `.npmrc`
> ```
//dev-console-npm.stage1.ng.bluemix.net/:_authToken="u6vjQywpRv51/eKBiRcAFA=="
@console:registry=https://dev-console-npm.stage1.ng.bluemix.net/
```

Install with `npm`

```
npm install @console/bluemix-components --save
```

#### Download

Go to [releases](https://github.ibm.com/Bluemix/bluemix-components/releases), find the version you want to use and download the source code as a `.zip` or `tar.gz` file.

![download-gif](https://media.github.ibm.com/user/76/files/159ed244-fdb9-11e5-9809-f7cd22e36217)


## Usage

#### *Usage guidelines are now deprecated :skull:*

Guidelines have fallen out of date and require more explanation of FED technologies as shown by user feedback.
Will be updating again soon to provide better "Getting Started" experience.

## FAQ

### Sass errors in `_extends.scss`
```
Error in plugin 'sass'
Message:
   bower_components/bluemix-components/base-elements/lists/_partials/_extends.scss
Error: "%table-section" failed to @extend "%helvetica-normal".
      The selector "%helvetica-normal" was not found.
      Use "@extend %helvetica-normal !optional" if the extend should be able to fail.
       on line 3 of bower_components/bluemix-components/base-elements/lists/_partials/_extends.scss
@extend %helvetica-normal;
```

The error is caused by a couple of things: `gulp-sass` by way of `node-sass` has become more strict about what SCSS will compile to CSS. This also exposed that in older versions; Bluemix Components was improperly using `@extend %placeholder` by either:
* extending a non-existent `%placeholder`
* using `@extend` within a `@media` query; both are not allowed.

We have since patched various earlier versions to deprecate these properties, we are also using `@mixin` exclusively.

##### How to fix this

You have a few options:

* Use `node-sass@3.4.2`, *this exact version*.
* Update to one of our patches appropriate to your version.
  * `5.x.x` update to `5.0.3-alpha`
  * `4.7.x` you're good
  * `4.6.x` update to `4.6.2-alpha`
  * `4.0.x` or older, update to `4.1.2-alpha`
  * Or update to `latest` stable version, see [releases](https://github.ibm.com/Bluemix/bluemix-components/releases)


## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
