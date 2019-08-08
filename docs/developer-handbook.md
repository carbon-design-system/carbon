# Developer Handbook

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Getting started](#getting-started)
- [Common tasks](#common-tasks)
- [Dependency management](#dependency-management)
  - [Continuous Integration](#continuous-integration)
- [Package architecture and layout](#package-architecture-and-layout)
  - [Packages shipping Sass](#packages-shipping-sass)
    - [Entrypoint behavior](#entrypoint-behavior)
- [Commit conventions](#commit-conventions)
  - [Commit message format](#commit-message-format)
  - [Type](#type)
  - [Subject](#subject)
  - [Body](#body)
  - [Footer](#footer)
  - [Examples](#examples)
- [FAQ](#faq)
    - [How do I install a dependency?](#how-do-i-install-a-dependency)
    - [CircleCI is failing saying that it cannot find a dependency in offline mode](#circleci-is-failing-saying-that-it-cannot-find-a-dependency-in-offline-mode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Getting started

Carbon is built using a collection of packages all built in the same Git
repository. You might have heard this setup described as a
[monorepo](https://en.wikipedia.org/wiki/Monorepo).

As a result, we use two pieces of tooling to help us managing installing
dependencies and publishing our packages. These include:

- [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) for handling
  dependencies across all packages
- [Lerna](https://lerna.js.org/) for publishing packages, tagging versions, and
  more

In order for you to install all the dependencies in this project, you'll need to
[install Yarn](https://yarnpkg.com/en/docs/install) and run the following
command in your terminal:

```bash
yarn install
```

This will install all of the dependencies for every package in our project. In
addition, it allows us to link between packages that we are developing.

This strategy is particularly useful during development, and tooling like Lerna
will pick up on when packages are linked in this way and will automatically
update versions when publishing new versions of packages.

Next up, you'll most likely want to build all of the package files so that
things don't fail while you are working on a package. To do this, you can run
the following command:

```bash
yarn build
```

Afterwards, you should be good to go! For more information about how we handle
dependencies, take a look at our write-up [here](#dependency-management).

## Common tasks

While working on Carbon, here are some of the top-level tasks that you might
want to run:

| Command                           | Usage                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `yarn build`                      | Uses `lerna` to run the `build` script in each package                                                        |
| `yarn clean`                      | Resets the state of the project by removing all `node_modules` and running the `clean` script in each package |
| `yarn doctoc`                     | Runs `doctoc` on all files in the `doctoc` directory                                                          |
| `yarn format`, `yarn format:diff` | Format files using Prettier, check if files have been formatted                                               |
| `yarn sync`                       | Sync package files across the project                                                                         |
| `yarn lint`                       | Run eslint on files in the project                                                                            |

In addition, you can use `yarn` to run `bin` files using the `yarn <bin>`
syntax. For example, if you wanted to use `lerna` to run a script in every
package you could do the following:

```bash
# Access $(yarn bin)/lerna and pass `run build` to the executable
yarn lerna run build
```

## Dependency management

In light of potential `npm` security issues
[[1]](https://blog.npmjs.org/post/175824896885/incident-report-npm-inc-operations-incident-of)
[[2]](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes),
we are addressing some of the issues with installing dependencies from a live
registry by taking advantage of
[Yarn's offline feature](https://yarnpkg.com/blog/2016/11/24/offline-mirror/).
The majority of steps taken are inspired by
[this tweet](https://twitter.com/leeb/status/1017607265115750400) from Lee
Byron.

### Continuous Integration

We specify a `.yarnc` file in this project that sets the path for Yarn's offline
mirror to the folder `.yarn/offline-mirror`. This folder contains all the
tarballs for the packages that the project uses. What this allows us to do is
run `yarn install --offline` in our Continuous Integration environment so that
we don't have to fetch from the live registry in our builds.

## Package architecture and layout

### Packages shipping Sass

If a package in elements is shipping Sass-based files, then it will follow a
certain number of conventions.

The first convention is that each of these packages will have a `scss` folder
that contains all the Sass files for the package. For example, `@carbon/colors`
would have a folder at `@carbon/colors/scss` in the import path for Sass.

To include the entire package, there are two options within this `scss` folder:
the `index.scss` entrypoint for modules and an entrypoint for inline support.
The `index.scss` entrypoint would be found at `@carbon/colors/scss/index.scss`
and would work for teams that are using tools like eyeglass or have already
setup `node-sass`'s `includePaths` option to include `node_modules`.

The other entrypoint option is for inline support. This option will work without
having to use eyeglass or something like `node-sass`'s `includePaths` option.
Each package that ships a `scss` folder will include this entrypoint, and the
name will reflect the package name. For example, `@carbon/colors` would have an
entrypoint available at `@carbon/colors/scss/colors.scss`.

#### Entrypoint behavior

The entrypoints of our Sass packages will output CSS (side-effects) by default,
unless there is no corresponding CSS to output. These side-effects help with
quickly using a package, but sometimes an application developer will want to
control behavior in order to manage side-effects. For these cases, we expose
additional files that you can include in your project, most notably a common
`scss/mixins.scss` file.

For example, in `@carbon/colors` we can import the `carbon--colors` mixin by
importing `@carbon/colors/scss/mixins.scss`. These types of files are guaranteed
to have no, or minimal, side-effects. The only side-effects that are emitted are
global variable initializations as this is required behavior in newer versions
of Sass.

Using these `mixins.scss` entrypoints allows you as an application developer to
control when these side-effects are applied in your project.

## Commit conventions

This project follows a structured format for writing commit messages. The main
benefit of this approach is that we can use these details to automatically
generate things like changelogs, in addition to clarifying what changes
correspond to when looking at our Git history.

### Commit message format

_Parts of this section are duplicated from
[Angular's commit conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)_.

Each commit message consists of a **header**, a **body** and a **footer**. The
header has a special format that includes a type, a scope and a subject:

```git
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional. There
are a few validation rules that we also enforce, namely that:

- The header must always be fewer than **72** characters
- Any line in the commit body must be fewer than **80** characters

Most of these rules are to help with integration of `git` with common tools.

_Note: we check for this commit format using a tool called
[`commitlint`](https://commitlint.js.org/#/)_.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies
- **chore**: Changes that do not affect the meaning of the code (white-space,
  formatting, missing semi-colons, etc.)
- **ci**: Changes to our CI configuration files and scripts
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: A code change that reverses a previous commit
- **test**: Adding missing tests or correcting existing tests

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the subject, use the imperative, present tense: "change" not
"changed" nor "changes". The body should include the motivation for the change
and contrast this with previous behavior.

### Footer

The footer should contain any information about Breaking Changes.

Breaking Changes should start with the word BREAKING CHANGE: with a space or two
newlines. The rest of the commit message is then used for this.

### Examples

<details>
  <summary>Feature (`feat`)</summary>

```diff
// Adding new functionality to a piece of code is considered a feature.
// This can be seen as extending an existing API
-function MyComponent({ propA }) {
+function MyComponent({ propA, propB }) {
  // ...
}
```

</details>

<details>
  <summary>Bug fix (`fix`)</summary>

```diff
// Updating an implementation to correct a fault in the existing code is
// considered a bug fix
function add(a, b) {
-  return a - b;
+  return a + b;
}
```

</details>

<details>
  <summary>Chore (`chore`)</summary>

Running things like formatting, or generally any project clean-up tasks, can be
considered a chore that we are doing to keep things up-to-date.

</details>

## FAQ

#### How do I install a dependency?

When installing a dependency, you can just do `yarn add <dependency-name>` as
normal. The only difference now is that you also will check in the corresponding
tarball entry in `.yarn/offline-mirror` as well so that we don't have to fetch
this dependency from the live registry during Continuous Integration builds.

#### CircleCI is failing saying that it cannot find a dependency in offline mode

Most likely this is due to Yarn mistakenly removing, or forgetting to add, a
dependency to our offline mirror. Typically, running the following set of
commands should reset the project back to a valid state and should bring back
any missing dependencies or fetch new ones.

```bash
yarn clean
yarn cache clean
yarn
```
