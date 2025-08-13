# Contributing

## Our contribution model

Carbon Design System is an **open source** project at IBM. We pride ourselves on
open and inclusive design and development. If you're curious about our
contribution process, you're in the right place. Thank you for your interest!

This project is made possible not just by the core Carbon team, but by community
members who’ve generously contributed their time to give back.

## Code of conduct

[Code of conduct](./CODE_OF_CONDUCT.md)

## Prerequisites

Before contributing, ensure you have these tools installed:

- [Node.js](https://nodejs.org/en/download/) – Use the version specified in
  [.nvmrc](../.nvmrc).
  - On macOS, we recommend using [nvm](https://github.com/nvm-sh/nvm) to manage
    Node versions.
- [Git](https://github.com/git-guides/install-git)
- [Yarn](https://yarnpkg.com/getting-started)
- [WSL](../docs/guides/setup/windows.md) (Windows only)

If you're on Windows, follow
[these additional steps](../docs/guides/setup/windows.md).

You'll also need a code editor. [VS Code](https://code.visualstudio.com/) and
[Sublime Text](https://www.sublimetext.com/) are popular options.

Once these tools are installed, you're ready to contribute!

## Start contributing

### Setting up your environment

#### Fork the repository

[Forking a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#forking-a-repository)

#### Clone your fork

[Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository#cloning-a-repository)

#### Add upstream remote

After cloning your fork, set up the upstream remote:

```sh
# Add the upstream remote to your repo
git remote add upstream git@github.com:carbon-design-system/carbon.git

# Verify the remote was added
git remote -v
```

Expected output:

```sh
origin  git@github.com:<your_github_username>/carbon.git (fetch)
origin  git@github.com:<your_github_username>/carbon.git (push)
upstream  git@github.com:carbon-design-system/carbon.git (fetch)
upstream  git@github.com:carbon-design-system/carbon.git (push)
```

Great job on getting to this point! Now it's time to code :computer:

### Making a contribution

#### Find or create an issue

Check the [issues list](https://github.com/carbon-design-system/carbon/issues)
for anything you'd like to work on. If something exists, comment to claim it.

No issue yet?
[Create one](https://github.com/carbon-design-system/carbon/issues/new/choose).
Issues help us track work and streamline the contribution process.

Looking for a good starting point? Try these:

- [Good first issues 👋](https://github.com/carbon-design-system/carbon/issues?q=label%3A%22good%20first%20issue%20%F0%9F%91%8B%22)
- [Low severity bugs 🐛](https://github.com/carbon-design-system/carbon/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22severity%3A%203%22%20OR%20label%3A%22severity%3A%204%22)

For something more advanced, the
[enhancements that need a community contribution](https://github.com/carbon-design-system/carbon/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22needs%3A%20community%20contribution%22%20label%3A%22type%3A%20enhancement%20%F0%9F%92%A1%22)
are a good option.

#### Create a working branch

Before making any changes, create a branch from `main` to keep your work
organized and separate from the main codebase. This makes it easier to manage
your changes and submit them as a pull request (PR) later.

```sh
git pull origin main
git checkout -b <your_branch_name>
```

#### Build and start the development server

From the root directory, run the following commands:

```sh
# Install the project's dependencies.
yarn install

# Build the project.
yarn build
```

To start coding, navigate to the package you'll be working on. For example, if
contributing to React components (i.e., `@carbon/react`), run the following
commands:

```sh
# Navigate to the React components package.
cd packages/react

# Start the Storybook development server.
yarn storybook
```

> [!NOTE]
>
> The command to start the development server differs between packages. Check
> the `scripts` section in the `package.json` of the package you're working on
> to find the correct command.

Once the development server is running, you can edit the source code or create
new components. The system automatically bundles your changes. Visit
http://localhost:3000 to see your changes live.

Refer to the [developer handbook](../docs/developer-handbook.md#coding-style)
for guidance on coding style (e.g., naming conventions, file structure).

#### Test

If you're working on JavaScript or TypeScript code, test your changes by running
the following command:

```sh
yarn test
```

For detailed testing information, see the
[style guide](../docs/style.md#testing).

#### Add yourself to the contributor list

To ensure you are recognized for your contributions, add yourself to the
Contributors table in the [README](../README.md#contributors) by running the
following commands:

```sh
yarn all-contributors add <your_github_username> <contribution>
yarn all-contributors generate
```

Visit https://allcontributors.org/docs/en/cli/usage#all-contributors-add for
more details.

#### Create a pull request

When you're ready to submit your changes for review, commit and push your
branch. Use a descriptive commit message that follows the conventions in our
[developer handbook](../docs/developer-handbook.md#commit-conventions).

Then, create a PR to the main Carbon repo by following GitHub's
[guide to creating a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

See
[How to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
for tips on writing a good PR description.

#### Sign the DCO

All contributors must sign our
[Developer Certificate of Origin (DCO)](https://github.com/carbon-design-system/carbon-dco).
When you open a pull request, a bot will check if you've signed. If you have
not, it will comment with instructions on how to sign.

#### Update a pull request

Stay up to date with activity in your PR. When you create a PR, reviews will be
requested automatically. Maintainers will review your work, make comments, ask
questions, and suggest changes. This process is collaborative and may take a few
iterations.

When you need to make a change, use the same method detailed in the previous
section to make additional commits on your branch. Once you push those changes
to your fork on GitHub, the PR will automatically update with your new commits.

One thing that reviewers will check for is whether CI is passing. If you
encounter any issues, check the CI logs for details. If you need help, ask.

Once the changes are complete and your PR is approved, a maintainer will merge
your changes.

## FAQ

### Who can contribute?

Anyone! The only requirement is a public GitHub account as all our assets live
on GitHub. Sign up on https://github.com.

- **Development:** If coding is your thing, you can help us by contributing bug
  fixes or community components. Check out our
  [Developer Handbook](../docs/developer-handbook.md) for setup and best
  practices.
- **Design:** Contribute visual assets, UX interactions, motion design, Figma
  kit fixes, and more.
- **Content:** Whether updating docs or adding new
  [patterns](https://carbondesignsystem.com/patterns/overview/), anyone can
  contribute to our contributions to our
  [website content](https://github.com/carbon-design-system/carbon-website).
  - **Research:** If you have findings to improve the Carbon user experience,
    share them — ideally with supporting design and development details in a
    GitHub issue and subsequent PR.

### How else can I contribute?

Great question! You can contribute without directly creating or maintaining
assets:

- **Join our community:**
  - _For IBMers_: Join our internal Slack channels like `#carbon-react`,
    `#carbon-web-components`, `#carbon-design-system`, `#carbon-ng`,
    `#carbon-vue`, and `#carbon-announcements`.
  - _For everyone else_: Join our
    [Discord server](https://discord.gg/J7JEUEkTRX) to engage with maintainers,
    ask questions, and stay in the loop.
- **Report bugs:** Even if you can’t submit a fix, opening a well-documented
  issue makes a big difference.

### Do I need to submit code for every framework?

While the core team maintains the React and Web Component implementations, other
framework teams work to maintain parity. If you fix a bug in one framework for a
component that exists in multiple frameworks, either submit a fix for the other
versions or open an issue so we can update them.

### How can I test components or share a bug reproduction?

Use in-browser development environments. Templates are available at
[new.carbondesignsystem.com](https://new.carbondesignsystem.com)

### Can you assign me to the issue I want to work on?

We only assign team members and core maintainers. To claim an issue, add a
comment stating you're going to work on it. If you haven't created a PR for that
issue within two weeks, the issue is considered fair game again for someone else
to pick up and work on.

### When can I work on an issue that someone else has said they're working on?

Our rule of thumb is if an issue doesn't have a PR in two weeks, it's fair game
for someone else to work on.

### Why do you only assign team members and core maintainers?

An assignee indicates the issue is currently being worked on or is planned for
our current sprint. Scoping assignment to our team ensures we can maintain that
expectation.
