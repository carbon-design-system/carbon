# Contributing

## Our contribution model

Carbon Design System is an **open source** project at IBM. We pride ourselves in
open and inclusive design and development. If you're wondering more about our
contribution process, you're in the right place. First off, thank you for your
interest! This project is made possible not just by the core Carbon team, but
also by several community members who have invested their own time to give back
to the Carbon community.

## Code of conduct

We value all of our community members, and thus want to foster a positive
contributing environment. Please take a look at our
[code of conduct](./CODE_OF_CONDUCT.md) before engaging in our workspaces.

## Prerequisites

Before contributing to Carbon, you should make sure you have the following tools
installed:

- [Node.js](https://nodejs.org/en/download/) v18 or above here or follow their
  installation through a package manager
  [here](https://nodejs.org/en/download/package-manager/))
  - If you're on macOS, we recommend using
    [`nvm`](https://github.com/nvm-sh/nvm) to help manage different versions of
    Node.js [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) as your
    version manager for Node.
- Git
- [Yarn](https://yarnpkg.com/en/docs/install)
- [WSL](../docs/guides/setup/windows.md) (Windows Only)

If you're using Windows, there are some
[additional steps](https://github.com/carbon-design-system/carbon/blob/main/docs/guides/setup/windows.md)
you'll need to take.

You'll also need a code editor to make changes to Carbon. There are many to
choose from but some popular options are
[VSCode](https://code.visualstudio.com/), [Atom](https://atom.io), and
[Sublime](https://www.sublimetext.com/).

With that all in place, you're ready to start contributing to Carbon!

## Start contributing

## - Setting up your environment -

### 1. Fork the repo:

Go to
[Carbon's repository on GitHub](https://github.com/carbon-design-system/carbon)
and click the `Fork` button in the top-right corner. This will create a copy
repo of Carbon associated with your account.

### 2. Clone your fork:

1.  Go to your [GitHub Repositories](https://github.com/settings/repositories).
1.  Click on `[your_github_username]/carbon`.
1.  Click on the `Code` button and copy the URL from the `Clone with SSH`
    option. It should start with `git@github.com...`

In your terminal:

```sh
git clone git@github.com:[your_github_username]/carbon.git
cd carbon
```

See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more
details.

### 3. Add upstream remotes

When you clone your forked repo, running `git remote -v` will show that the
`origin` is pointing to your forked repo by default.

Now you need to add the `carbon-design-system/carbon` repo as your upstream
remote branch:

```sh
# Add the upstream remote to your repo
git remote add upstream git@github.com:carbon-design-system/carbon.git

# Verify the remote was added
git remote -v
```

Your terminal should output something like this:

```sh
origin  [your forked repo] (fetch)
origin  [your forked repo] (push)
upstream    git@github.com:carbon-design-system/carbon.git (fetch)
upstream    git@github.com:carbon-design-system/carbon.git (push)
```

Great job on getting to this point! Now it's time to code :computer:

## - Setting up your code -

### 1. Find or create an issue

Before you start coding, if you have an issue in mind that you'd like to tackle,
please first [search](https://github.com/IBM/carbon-components/issues) the
issues to see if a similar issue you'd like to work on has already been
submitted. If a similar issue has been submitted, assign yourself or ask to be
assigned to the issue by posting a comment.

If the issue does not exist, please make a new issue. Issues give us context
about what you are contributing and expedite the process to getting your
contributions merged into Carbon. It's a win for everybody :tada:

If you have no idea what you'd like to contribute, take a look at our backlog of
issues and take your pick! Our issues with the label
[`good first issue`](https://github.com/carbon-design-system/carbon/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue+%F0%9F%91%8B%22)
are a great starting point. 👋

### 2. Work in a branch

When contributing to Carbon, your work should always be done in a branch off of
your repo, this is also how you will submit your pull request when your work is
done.

To create a new branch, ensure you are in your forked branch in your terminal
and run:

```sh
git pull origin main
git checkout -b {your-branch-name}
```

### 3. Build and start the development server

From the root directory of your fork, run:

```sh
# To install the project's dependencies
yarn install

# To build the project:
yarn build
```

To get your development server running and to start coding, you'll need to
navigate to the package in which you will be working. For example, if you plan
on contributing to our React components, you can enter in your command line
`cd packages/react` and then run:

```sh

yarn storybook
```

This will start a development server where you can see any changes you are
making to components in our react components Storybook.

The command to start the server will differ depending on which package you are
working within. To find out which command you'll need to run, you can check the
`scripts` in the package's `package.json`.

Once it's done building, you can edit source code or create new components. The
system is set up to automatically bundle your changes/additions. Visit
http://localhost:9000 to see the changes happen on the fly.

For information about our coding style, such as how we name our classes and our
file structure, go to our
[developer handbook](https://github.com/carbon-design-system/carbon/blob/main/docs/developer-handbook.md#coding-style)

### 4. Test your JavaScript code

If you're contributing to our JavaScript code, test your changes by running our
test commands:

```sh
yarn test
```

For more extensive testing information, see our
[developer handbook](https://github.com/carbon-design-system/carbon/blob/main/docs/developer-handbook.md#common-tasks)

### 5. Add yourself to the contributor list

We want to make sure everyone is recognized for their contributions to Carbon!
To add yourself to the `all-contributors` table in the README, you'll need to
run the following commands from the root of the repo:

```sh
# Add new contributor <username>, who made a contribution of type <contribution>
yarn all-contributors add <username> <contribution>
# Example:
yarn all-contributors add tw15egan code,doc
```

Then, you'll need to generate the updated `all-contributors` table by running

```sh
yarn all-contributors generate
```

### 6. Make a pull request

When you're at a good stopping place and you're ready for feedback from other
contributors and maintainers, **push your commits to your fork**:

To do so, go to your terminal and run:

```sh
git add -A
git commit -m "YOUR  COMMIT MESSAGE HERE"
```

#### Commit tip

> **Writing commit messages**
>
> - `<type>` indicates the type of commit that's being made. This can be:
>   `feat`, `fix`, `perf`, `docs`, `chore`, `style`, `refactor`
> - `<scope>` The scope could be anything specifying place of the commit change
>   or the thing(s) that changed.
>
> **Commit message format:**

For more information about how to write your commit message, view our commit
conventions detailed in a our
[developer handbook](https://github.com/carbon-design-system/carbon/blob/main/docs/developer-handbook.md#commit-conventions).

After your changes are committed, run:

```sh
git push -u origin { YOUR_BRANCH_NAME }
```

In your browser, navigate to
[carbon-design-system/carbon-](https://github.com/carbon-design-system/carbon)
and click the button that reads `Compare & pull request`

Write a title and description then click `Create pull request`

- [How to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)

### 9. Updating a pull request

Stay up to date with the activity in your pull request. Maintainers from the
Design System team will be reviewing your work and making comments, asking
questions and suggesting changes to be made before they merge your code.

When you need to make a change, use the same method detailed above except you no
longer need to run `git push -u origin { YOUR_BRANCH_NAME }` just `git push`.

Once all revisions to your pull request are complete, someone from Design
Systems will squash and merge your commits for you.

## FAQ

### Who can contribute?

Anyone! We mean it. The one and only requirement is you'll need a
[public GitHub account](https://github.com/join), as all our assets live on
GitHub.

- **Development:** If coding is your thing, you can help us by contributing bug
  fixes or community components. Checkout our
  [Developer Handbook](../docs/developer-handbook.md) to get your dev
  environment set up, read up on our best practices and more.
- **Design:** Design contributions can vary from visual assets, UX interactions,
  motion design, Sketch kit bug fixes and more.
- **Content:** Our documentation is just as important as our design and code
  assets. Whether it's updating our current docs, or adding new
  [patterns](./patterns), anyone can contribute to our
  [website content](https://github.com/carbon-design-system/carbon-website).
- **Research:** Carbon is made up of developers and designers, but
  unfortunately, no dedicated researchers. If you're a researcher and have
  findings that you think could improve Carbon users' experience, you're in the
  right place. This kind of contribution is most effective if coupled with
  design and development forces, which would be presented in a GitHub issue and
  subsequent PR.

### What is the contribution process?

1. **Issue:** Check repo for an _existing_ issue related to your contribution
   first. If none exist, open a new issue. Be sure to check the right repo.
   (i.e. Don't open an issue for website documentation in the `carbon`
   monorepo.) We reserve the right to close any issues that haven't been filled
   out properly according to the issue template.
2. **Development environment:** If you haven't already, fork and clone whichever
   repo you want to contribute to. Then, create a new branch and add your
   contribution in it. Checkout our
   [Developer Handbook](../docs/developer-handbook.md) to read up on our best
   coding practices and proper commit messages.
3. **Pull request:** Submit a PR. Be sure to fill out the template properly.
4. **Developer Certificate of Origin:** In order to contribute any code, we need
   you to sign a Developer Certificate of Origin (DCO). Code doesn't just mean
   "components"; if you're contributing to our website docs, you're contributing
   code. Sign the
   [DCO](https://github.com/carbon-design-system/carbon-dco/blob/main/dco.md) by
   making a comment in the PR you just made.
5. **Approval:** Get PR approved by design and developers, or make any necessary
   changes for approval. This process may be quick or take a few iterations of
   feedback-update.
6. **Documentation:** After design and dev have approved and merged PR, update
   any website documentation if necessary. One of the best examples for this is
   if you're contributing to component work which has website documentation
   related to your contribution.

Here are some contribution quick tips:

- **Do** check repos for existing issues.
- **Do** fill out the required template for contributions entirely; this
  pertains to both issues and PRs.
- **Do** add or update tests for any contributions that require it.
- **Do** follow existing coding and writing styles.
- **Do** follow proper commit messages syntax.
- **Do not** branch off another branch.
- **Do not** include unrelated changes in the same PR.
- **Do not** create one massive PR if it can be broken up into smaller PRs.

### What projects can I contribute to?

- [`carbon-components`](https://github.com/carbon-design-system/carbon/tree/main/packages/components)
- [`carbon-components-react`](https://github.com/carbon-design-system/carbon/tree/main/packages/react)
- [`carbon-website`](https://github.com/carbon-design-system/carbon-website)
- [`gatsby-theme-carbon`](https://github.com/carbon-design-system/gatsby-theme-carbon)
- [`carbon-design-kit`](https://github.com/carbon-design-system/carbon-design-kit)
- [`@carbon/elements`](https://github.com/carbon-design-system/carbon/tree/main/packages/elements)
- [`@carbon/type`](https://github.com/carbon-design-system/carbon/tree/main/packages/type)
- [`@carbon/colors`](https://github.com/carbon-design-system/carbon/tree/main/packages/colors)
- [`@carbon/grid`](https://github.com/carbon-design-system/carbon/tree/main/packages/grid)
- [`@carbon/icons`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons)
- [`@carbon/layout`](https://github.com/carbon-design-system/carbon/tree/main/packages/layout)
- [`@carbon/motion`](https://github.com/carbon-design-system/carbon/tree/main/packages/motion)
- [`@carbon/themes`](https://github.com/carbon-design-system/carbon/tree/main/packages/themes)
- [`@carbon/icons-react`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react)

And more! You can view a complete list of our packages
[here](https://github.com/carbon-design-system/carbon/tree/main/packages).

### Besides some of the obvious contributions mentioned above, how else can I contribute?

Great question! Contribution does not require creating or maintaining our
assets. Here are some other ways you can contribute, which don't require much
work:

- **Join our slack community and interact with other users.** We have hundreds
  of users world wide, and quite a small team in comparison. While we try our
  best to answer questions on slack, it's not always possible to answer
  everything. One of the easiest ways to help us it to jump in on slack
  conversations if there's something you know the answer to! Some of our most
  popular slack channels include `#carbon-components`, `#carbon-react`,
  `#carbon-design-system`, `#carbon-ng`, `#carbon-vue`, `#carbon-announcements`,
  `#carbon-community-components`.
- **Report bugs.** Even if you don't have the time to contribute a bug fix,
  opening an issue alone makes a big difference! Be sure to completely fill out
  the issue template to best help us understand what is going wrong.

### If I'm contributing code, am I required to contribute it for all frameworks?

If you've been working with Carbon for a while, you know that we have code
assets in multiple frameworks. While the core team only maintains the React
components, we work closely with the other framework teams to maintain parity.
If you're contributing a bug fix in a framework other than React for a component
which also exists in the React version, you can either contribute a fix for the
React version as well or open an issue so that we can update the React component
accordingly.

### How can I test-drive components or provide a bug reproduction?

There are some fantastic tools out there today that provide a near fully-fledged
development environment in the browser. These are incredibly helpful for trying
out simple configurations or providing working code demonstrating bugs or
problems with the libraries.

We've created a few templates, housed in the repo, that can be used on these
services:

#### Stackblitz

- [`@carbon/react` template](https://stackblitz.com/github/carbon-design-system/carbon/tree/main/examples/vite?file=src%2FApp.jsx),
  supporting faster sass compilation and react component usage

#### Codesandbox

- [`@carbon/react` template](https://codesandbox.io/s/github/carbon-design-system/carbon/tree/v11.2.0/examples/codesandbox)
- [`@carbon/styles` template](https://codesandbox.io/s/github/carbon-design-system/carbon/tree/v11.2.0/examples/codesandbox-styles)
- [`carbon-components-react` template](https://codesandbox.io/s/github/carbon-design-system/carbon/tree/v10/packages/react/examples/codesandbox),
  configured to use v10.x assets
