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
[code of conduct](https://github.com/carbon-design-system/carbon/blob/master/docs/developer-handbook.md#carbon-code-of-conduct)
before engaging in our workspaces.

## Prerequisites

Before contributing to Carbon, you should make sure you have the following tools
installed:

- [Node.js](https://nodejs.org/en/download/) v10 or above here or follow their
  installation through a package manager
  [here](https://nodejs.org/en/download/package-manager/))
  - If you're on macOS, we recommend using
    [`nvm`](https://github.com/nvm-sh/nvm) to help manage different versions of
    Node.js [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) as your
    version manager for Node.
- Git
- [Yarn](https://yarnpkg.com/en/docs/install)

You'll also need a code editor to make changes to Carbon. There are many to
choose from but some popular options are
[VSCode](https://code.visualstudio.com/), [Atom](https://atom.io), and
[Sublime](https://www.sublimetext.com/).

With that all in place, you're ready to start contributing to Carbon!

## Start contributing

### 1. Fork the repo:

Go to
[Carbon's repository on GitHub](https://github.com/carbon-design-system/carbon)
and click the `Fork` button in the top-right corner. This will create a copy
repo of Carbon associated with your account.

### 2. Clone your fork:

1.  Go to your [GitHub Repositories](https://github.com/settings/repositories).
1.  Click on `[your_github_username]/carbon`.
1.  Click on the `Clone or Download` button and copy the URL from the
    `Clone with SSH` option. It should start with `git@github.com...`

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

### 4. Work in a branch

When contributing to Carbon, your work should always be done in a branch off of
your repo, this is also how you will submit your pull request when your work is
done.

To create a new branch, ensure you are in your forked branch in your terminal
and run:

```sh
git pull origin master
git checkout -b {your-branch-name}
```

### 5. Build and start the development server

From the root directory of your fork, run:

```sh
# To install the project's dependies
yarn install --offline

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
[developer handbook](https://github.com/carbon-design-system/carbon/blob/master/docs/developer-handbook.md#coding-style)

### 6. Test your JavaScript code

If you're contributing to our JavaScript code, test your changes by running our
test commands:

```sh
yarn test
```

For more extensive testing information, see our
[developer handbook](https://github.com/carbon-design-system/carbon/blob/master/docs/developer-handbook.md#common-tasks)

### 7. Make a pull request

**Note:** Before you make a pull request,
[search](https://github.com/IBM/carbon-components/issues) the issues to see if a
similar issue has already been submitted. If a similar issue has been submitted,
assign yourself or ask to be assigned to the issue by posting a comment. If the
issue does not exist, please make a new issue. Issues give us context about what
you are contributing and expedite the process to getting your contributions
merged into Carbon. It's a win for everybody :tada:

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
[developer handbook](https://github.com/carbon-design-system/carbon/blob/master/docs/developer-handbook.md#commit-conventions).

After your changes are commited, run:

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
2. **Contributor License Agreement:** Before you can contribute any code, we
   need you to sign a Contributor License Agreement (CLA). Code doesn't just
   mean "components"; if you're contributing to our website docs, you're
   contributing code. ;)
3. **Development environment:** If you haven't already, fork and clone whichever
   repo you want to contribute to. Then, create a new branch and add your
   contribution in it. Checkout our
   [Developer Handbook](../developer-handbook.md) to read up on our best coding
   practices and proper commit messages.
4. **Pull request:** Submit a PR. Be sure to fill out the template properly.
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

- [`carbon-components`](https://github.com/carbon-design-system/carbon/tree/master/packages/components)
- [`carbon-components-react`](https://github.com/carbon-design-system/carbon/tree/master/packages/react)
- [`carbon-website`](https://github.com/carbon-design-system/carbon-website)
- [`gatsby-theme-carbon`](https://github.com/carbon-design-system/gatsby-theme-carbon)
- [`carbon-design-kit`](https://github.com/carbon-design-system/carbon-design-kit)
- [`@carbon/elements`](https://github.com/carbon-design-system/carbon/tree/master/packages/elements)
- [`@carbon/type`](https://github.com/carbon-design-system/carbon/tree/master/packages/type)
- [`@carbon/colors`](https://github.com/carbon-design-system/carbon/tree/master/packages/colors)
- [`@carbon/grid`](https://github.com/carbon-design-system/carbon/tree/master/packages/grid)
- [`@carbon/icons`](https://github.com/carbon-design-system/carbon/tree/master/packages/icons)
- [`@carbon/layout`](https://github.com/carbon-design-system/carbon/tree/master/packages/layout)
- [`@carbon/motion`](https://github.com/carbon-design-system/carbon/tree/master/packages/motion)
- [`@carbon/themes`](https://github.com/carbon-design-system/carbon/tree/master/packages/themes)
- [`@carbon/icons-react`](https://github.com/carbon-design-system/carbon/tree/master/packages/icons-react)

And more! You can view a complete list of our packages
[here](https://github.com/carbon-design-system/carbon/tree/master/packages).

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
assets in vanilla JS, React, Vue and Angular. While the core team only maintains
the vanilla and React components, we work closely with the Vue and Angular teams
to maintain parity. The core team also develops with a React first approach,
which means that our vanilla components will never be ahead of React, though it
may not be true for the other way around. If you're contributing a bug fix in a
vanilla component which also exists in the React version, you can either
contribute a fix for the React version as well or open an issue so that we can
update the React component accordingly.
