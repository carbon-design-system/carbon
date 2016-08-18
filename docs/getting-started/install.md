# Install Bluemix Components

There are a few ways to get started.
Before installing Bluemix Components, make sure you set up your [SSH key on GitHub Enterprise](https://help.github.com/articles/generating-ssh-keys/).
You may also need to set up your SSH key on **Jenkins** or **Travis** if you use those for continuous integration or deployment.

## npm

Bluemix Components is published to a private npm registry maintained by Bluemix Ops Console team.

Before installing with npm,
you must create an **.npmrc** file - you can create this in the root of your project folder or on your computer's **~** directory.

```
$ touch .npmrc
```

Next, write the following into your **.npmrc** file:

```
//dev-console-npm.stage1.ng.bluemix.net/:_authToken="u6vjQywpRv51/eKBiRcAFA=="
@console:registry=https://dev-console-npm.stage1.ng.bluemix.net/
```

If you haven't done so already, create a **package.json** for your project:

```
$ npm init
```

Finally, install bluemix components with `npm`.

```
$ npm install @console/bluemix-components --save
```

## Bower

We also publish Bluemix Components to a private bower registry.
It's required to set up your [SSH Key on GitHub Enterprise](https://help.github.com/articles/generating-ssh-keys/) and on **Jenkins** or **Travis** if you use those as well.

Create a **bower.json** file:

```
$ bower init
```

Create a **.bowerrc** file in the root of your project directory and write the following config:

```json
{ "registry": "http://9.37.228.216:5678/" }
```

Finally, install the bower package.

```
$ bower install bluemix-components --save
```

## Download

Download the latest version of Bluemix Components (`6.7.0`).

* [Download .zip](https://github.ibm.com/Bluemix/bluemix-components/archive/6.7.0.zip)
* [Download tar.gz](https://github.ibm.com/Bluemix/bluemix-components/archive/6.7.0.tar.gz)

See [tags](https://github.ibm.com/Bluemix/bluemix-components/tags) on GitHub Enterprise for older versions.
See [releases](https://github.ibm.com/Bluemix/bluemix-components/releases) for release notes and changelogs.

## Bluemix Boilerplate

*coming soon*
