# Design

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Intro](#intro)
- [Getting started](#getting-started)
  - [Setting up your machine](#setting-up-your-machine)
    - [Install VS Code](#install-vs-code)
      - [Editing Markdown](#editing-markdown)
      - [Working with GitHub](#working-with-github)
    - [Install Homebrew](#install-homebrew)
    - [Install Yarn](#install-yarn)
  - [Pulling down the `carbon-elements` project](#pulling-down-the-carbon-elements-project)
- [Working with elements](#working-with-elements)
  - [Colors](#colors)
  - [Icons](#icons)
  - [Grid](#grid)
  - [Layout](#layout)
  - [Typography](#typography)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Intro

If you’re a designer looking to contribute, thanks so much for taking the time
to learn. We really appreciate it! We also want to make it as easy as possible
for you, so if you have any suggestions for improving this guide please let us
know!

## Getting started

### Setting up your machine

Before getting started, you will need to install some of the tools we use to
build the website. These tools also can be used to contribute to some of our
other projects, as well! To start off, you'll want to install a version of
Node.js and `npm`. These are the two powerhouse tools that drive most of the
work we do in JavaScript.

While you can install Node.js directly from
[their website](https://nodejs.org/en/), we recommend using a tool called
[`nvm`](https://github.com/creationix/nvm#install-script). Node.js can change
versions multiple times in a year, and this tool helps to easily update to the
latest version.

To install `nvm`, you can follow their
[install instructions](https://github.com/creationix/nvm#install-script). If
this is your first time working in the terminal, what you will need to do is
open up your terminal of choice (either Terminal.app or iTerm) and run the
following command next to the prompt:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

This command will install `nvm` for you, allowing you to run `nvm` commands
directly from your terminal. When this command completes, you should see a
message that looks like the following:

```bash
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
```

After you see this, you will need to run:

```bash
echo 'export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm' > ~/.bash_profile
```

When this is complete, you should open a new tab in your terminal and close the
one that you were using to enter in the commands above.

_Tip: to open a new tab, you can use `CMD`+`T`_

In this new tab, you should be able to run the following command from `nvm`:

```bash
nvm install v8
nvm alias default v8
```

This will install Node.js v8.x and alias is as your default Node.js version.

Now, each time you open the terminal you should be able to run the command
`node -v` and see an output that `v8.x.y`. In addition to installing Node.js and
the `node` command, this work will also install the `npm` tool for you to use in
the terminal.

#### Install VS Code

VS Code is a popular code editor that a good number of folks on our team like to
use. This editor has a number of advantages, including:

- Being able to view an entire project structure at once through its file
  explorer
- An integrated terminal so you don't have to worry about running a separate
  terminal application
- Easy way to edit project files and view changes through a markdown preview
  function
- A number of plugins that can simplify your GitHub workflow

To install VS Code, you can visit
[their website](https://code.visualstudio.com/) which should have a button to
download the editor for your specific computer. After the download completes,
you should unzip the file and drag the `Visual Studio Code.app` into your
`Applications` folder.

Once you've moved `Visual Studio Code.app` over, you should run it and accept
any security prompts that may pop-up. After launching VS Code, you should see a
screen similar to:

![screen shot 2018-09-14 at 10 53 12 am](https://user-images.githubusercontent.com/3901764/45561062-75300600-b80c-11e8-9b7b-6e1aae63d82c.png)

You can use this window to open up a specific folder on your computer that
contains your project's files. For the `design-system-website` project,
selecting the folder would look like:

![screen shot 2018-09-14 at 10 55 28 am](https://user-images.githubusercontent.com/3901764/45561178-b6281a80-b80c-11e8-84ff-56d534468254.png)

Clicking `Open` on the folder should populate an `EXPLORER` section on the
left-hand side of VS Code. Using this, you can navigate to any file in the
project, make edits to it, and more.

##### Editing Markdown

If you're working with markdown, it might be helpful to use the Markdown Preview
functionality built into VS Code. When you have a markdown file open in your
editor, you can go to `View` -> `Command Palette` (or `Shift`+`CMD`+`P`) and it
will bring up a prompt at the top of the file similar to the following:

![screen shot 2018-09-14 at 10 58 39 am](https://user-images.githubusercontent.com/3901764/45561337-2767cd80-b80d-11e8-8a2f-e2a303c70af0.png)

Inside of this command palette, you can type: `Markdown` to view all the
commands associated with VS Code's markdown plugin. To preview your changes, you
can use select `Markdown: Open Preview to the Site` and hit `Enter`. This should
open up a panel where you can view a rendered version of your markdown file
alongside the text for the file. If you make changes to the file on the left, it
should update on the right. Similarly, if you scroll in the markdown file it
will mirror the location on the left hand side.

##### Working with GitHub

VS Code has an excellent integration with GitHub, specifically for Pull
Requests. You can view the full details for this behavior over in
[this blog post](https://code.visualstudio.com/blogs/2018/09/10/introducing-github-pullrequests).

You can install this plugin by visiting the
[plugin URL](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github)
and clicking `Install`. You should see a prompt saying
`Open Visual Studio Code.app?` where you can then click
`Open Visual Studio Code.app`. You should see a screen that looks like the
following:

![screen shot 2018-09-14 at 11 02 58 am](https://user-images.githubusercontent.com/3901764/45561636-d3111d80-b80d-11e8-956c-d445438731c4.png)

On this screen, you need to click `Install` for the plugin to install in VS
Code, and then click `Reload` when it completes. `Reload` should appear in the
same location where the `Install` button was.

After reloading, you should see a dialog box in the lower right hand side of the
screen requesting for you to sign in with your public GitHub.com login:

![screen shot 2018-09-14 at 11 04 52 am](https://user-images.githubusercontent.com/3901764/45561720-0784d980-b80e-11e8-9aa2-ff924fba3740.png)

You should click `Sign In` and accept the following dialog requests in the
browser. After you have signed in, you should click on the icon that says
`Source Control` (it should be the third icon from the top of the left sidebar).
This will open up a panel that looks like the following:

![screen shot 2018-09-14 at 11 07 07 am](https://user-images.githubusercontent.com/3901764/45561852-53d01980-b80e-11e8-8f4e-b745e6b093d0.png)

Using the `GITHUB PULL REQUESTS` section, you can view all the Pull Requests on
the project that you are working on. When you click on a specific Pull Request,
you should be able to view all the changes associated with that Pull Request.
You can also view the Pull Request directly by clicking on `Description`.

![screen shot 2018-09-14 at 11 09 21 am](https://user-images.githubusercontent.com/3901764/45561972-a4e00d80-b80e-11e8-9c8b-e8e5e27552b6.png)

If you would like to view the changes on your computer, you can click the
`Checkout` button for it to checkout the specific Pull Request that you are
viewing. Clicking this button will allow you to view all the changed files on
your machine by going back to the explorer tab (first icon from the top). When
you're done looking at the changes, you can re-visit the Pull Request you
checked out and click `Exit Review Mode`.

#### Install Homebrew

[Homebrew](https://brew.sh/) is a tool used for installing software on MacOS
machines. Installing this on your machine is completely optional, but it can
make it easier to install other tools that might be relevant while working on
our projects. To install Homebrew, you can run the following command in your
terminal:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Install Yarn

[Yarn](https://yarnpkg.com/en/) is an alternative to the `npm` we use for the
website. Installing this is completely optional, but it can help when
contributing to other projects that we develop. You can install Yarn by using
Homebrew, or by following their install instructions
[here](https://yarnpkg.com/en/docs/install#alternatives-stable).

If you're using homebrew, you can install Yarn by running:

```bash
brew install yarn --without-node
```

### Pulling down the `carbon-elements` project

## Working with elements

This section assumes that you have followed the steps in
[Getting started](#getting-started), or feel comfortable following along without
instructions on working with git and GitHub.

### Colors

### Icons

### Grid

### Layout

### Typography
