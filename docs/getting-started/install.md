# Install Bluemix Components

There are a few ways to get started.
Before installing Bluemix Components, make sure you set up your [SSH key on GitHub Enterprise](https://help.github.com/articles/generating-ssh-keys/).
You may also need to set up your SSH key on **Jenkins** or **Travis** if you use those for continuous integration or deployment.

## npm

Bluemix Components is published on all three available sinopia registries provided by [OpsConsole/console-npm](https://github.ibm.com/OpsConsole/console-npm): **production, integration and development**.

Recommended: create this file in your `~` directory so that all of your projects can use this configuration. 

> Note: You can still `npm install` packages normally from the public npm registry while using **.npmrc** configuration for private registries.

Create an **.npmrc** file. 

```sh
$ touch ~/.npmrc
```

There are **three** private registries that you can use; `bluemix-components` will be published to all the registries.
Set up involves:
- Setting the npm registry you want to use
- Adding yourself as a user to produce your `authToken`

Set the private registry you want to use:

**Production:**
```sh
npm set registry https://console-npm.ng.bluemix.net
npm adduser --registry https://console-npm.ng.bluemix.net
```

**Integration:**
```sh
npm set registry https://int-console-npm.ng.bluemix.net
npm adduser --registry https://int-console-npm.ng.bluemix.net
```

**Development:**
```sh
npm set registry https://dev-console-npm.stage1.ng.bluemix.net
npm adduser --registry https://dev-console-npm.stage1.ng.bluemix.net
```

Follow the prompts and use the following information; the prompts are all the same for all registries:

```
Username: dev
Password: bmDev
Email: { YOUR_IBM_EMAIL }
```

Create a **package.json** for your project:

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
