# Contributing

## Our contribution model

Carbon Design System is an **open source** project at IBM. We pride ourselves on
open and inclusive design and development. If you're curious about our
contribution process, you're in the right place. Thank you for your interest!

This project is made possible not just by the core Carbon team, but by community
members who’ve generously contributed their time to give back.

## Code of conduct

<!--
TODO:
- Can this section be deleted? If not, can it be simplified to just a link?
- Should the Code of Conduct be linked from the README? Seems like everyone,
  including contributors, should see it there before they get to the
  contributing docs. If so, having it in the README could be another reason to
  delete this section.
-->

We value all community members and aim to foster a positive environment. Please
review our [Code of conduct](./CODE_OF_CONDUCT.md) before engaging in any
project spaces.

## Prerequisites

Before contributing, ensure you have these tools installed:

- [Node.js](https://nodejs.org/en/download/) – Use the version specified in
  [.nvmrc](../.nvmrc).
  - On macOS, we recommend using [nvm](https://github.com/nvm-sh/nvm) to manage
    Node versions.
- Git
  <!-- TODO: We link to installers for all of the other tools. Why not Git? -->
- [Yarn](https://yarnpkg.com/en/docs/install)
- [WSL](../docs/guides/setup/windows.md) (Windows only)

If you're on Windows, follow
[these additional steps](../docs/guides/setup/windows.md).

You'll also need a code editor. [VS Code](https://code.visualstudio.com/) and
[Sublime Text](https://www.sublimetext.com/) are popular options.

Once these tools are installed, you're ready to contribute!

## Start contributing

### Setting up your environment

#### Fork the repository

<!--
TODO: Should this entire section be simplified to just include a link to
GitHub’s fork instructions? These steps are subject to change as GitHub updates
its UI, as can be seen with the previous set of instructions being outdated. It
would be more straightforward to just point to the official GitHub documentation
rather than maintain a separate set of instructions.

Also, are we expecting people that have zero experience with Git or GitHub to
contribute to Carbon? If so, it seems like a better use of our time to point the
user to resources on Git and GitHub, like tutorials (e.g.,
https://github.com/firstcontributions/first-contributions,
https://github.com/git-guides, etc.), rather than re-explain basic workflows.
-->

1. Visit [Carbon’s GitHub repo](https://github.com/carbon-design-system/carbon).
2. Click the **Fork** button in the top-right corner.

#### Clone your fork

1. Go to https://github.com/<your_github_username>?tab=repositories (replace
   `<your_github_username>` with your GitHub username).
2. Click your `carbon` fork.
3. Click the **Code** button.
4. Click the **SSH** tab.
5. Copy the SSH URL.

In your terminal:

```sh
git clone git@github.com:<your_github_username>/carbon.git
cd carbon
```

<!--
TODO: If this doc is going to be linked, whats the point of everything above?
-->

See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more
details.

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
for anything you'd like to work on. If something exists, comment to claim it or
assign yourself.

No issue yet?
[Create one](https://github.com/carbon-design-system/carbon/issues/new/choose).
Issues help us track work and streamline the contribution process.

Looking for a good starting point? Try these:
[Good first issues 👋](https://github.com/carbon-design-system/carbon/issues?q=label%3A%22good%20first%20issue%20%F0%9F%91%8B%22)

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
> The command to start the development server differs between packages. Check
> the `scripts` section in the `package.json` of the package you're working on
> to find the correct command.

<!-- TODO: Should this next paragraph be deleted? -->

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

<!--
TODO: There are no more detailed testing instructions in the common tasks
section. Why is it linked here?
-->

For more detailed testing instructions, see the
[developer handbook](../docs/developer-handbook.md#common-tasks).

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

<!--
TODO: Should this section be replaced with a link to GitHub's PR docs.
https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request
-->

When you're ready for submit your changes for review, commit and push your
changes. Make sure to include a descriptive commit message that follows the
conventions listed in the
[developer handbook](../docs/developer-handbook.md#commit-conventions).

```sh
git add --all
git commit -m "<your_commit_message>"
git push -u origin <your_branch_name>
```

Then create a PR to the main Carbon repo:

1. Navigate to
   [carbon-design-system/carbon](https://github.com/carbon-design-system/carbon)
   in your browser.
2. Click **Compare & pull request**.
3. Update the title if necessary.
4. Fill in the description.
5. Click **Create pull request**.

<!--
TODO: Should this link be removed? Asking because the pull request template
guides the user through writing a good description.
-->

See
[How to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)
for tips on writing a good PR description.

#### Update a pull request

<!--
TODO: Doesn't seem like it should need to be explained how to update a pull
request. This process should be documented in the GitHub docs.
-->

Stay up to date with activity in your PR. Maintainers will review your work,
make comments, ask questions, and suggest changes.

When you need to make a change, use the same method detailed in the previous
section to make additional commits on your branch. Once you push those changes
to your fork on GitHub, the PR will automatically update with your new commits.

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
  <!--
  TODO: Are non-maintainers allowed to contribute design guidance? That seems to
  be what this point is implying.
  -->
  <!-- TODO: Should 'Sketch kit' be 'Figma kit'? -->
- **Design:** Contribute visual assets, UX interactions, motion design, Sketch
  kit fixes, and more.
  <!--
  TODO: ./patterns doesn't exist. Can this point be deleted? If not, what should
  be done here?
  -->
- **Content:** Whether updating docs or adding new [patterns](./patterns),
  anyone can contribute to our contributions to our
  [website content](https://github.com/carbon-design-system/carbon-website).
- **Research:** Carbon is made up of developers and designers, but
  unfortunately, no dedicated researchers. If you're a researcher and have
  findings that you think could improve Carbon users' experience, you're in the
  right place. This kind of contribution is most effective if coupled with
  design and development forces, which would be presented in a GitHub issue and
  subsequent PR.
  <!--
  TODO: Is the part about 'no dedicated researchers' actually true? I attended
  an internal Carbon event either last year or the year before where the amount
  of research that went into new and existing features was discussed. Something
  on the order of thousands of hours was saved by conducting user research and
  aligning component implementations with user needs. Alternatively, should the
  following point be used instead?
  -->
  <!--
  - **Research:** If you have findings to improve the Carbon user experience,
    share them—ideally with supporting design and development details in a GitHub
    issue and subsequent PR.
  -->

<!--
TODO: Isn't that what this entire doc is about? What's the point of this
section?
-->

### What is the contribution process?

1. **Issue:** Check for an existing issue related to your contribution. If none
   exists, open a new issue (make sure you use the correct repo; for example,
   don’t open an issue for website docs in the `carbon` monorepo). We may close
   issues not following the template.
2. **Development environment:** Fork and clone the repo, create a new branch,
   and add your contribution. Refer to our
   [Developer Handbook](../docs/developer-handbook.md) for coding practices and
   commit guidelines.
3. **Pull request:** Submit a PR and fill out the template properly.
4. **Developer Certificate of Origin:** To contribute any code, sign a Developer
   Certificate of Origin (DCO). This applies even to website docs. Sign the
   [DCO](https://github.com/carbon-design-system/carbon-dco/blob/main/dco.md) by
   commenting in your PR.
5. **Approval:** Get your PR approved by designers and developers, or update it
   as needed. This process may involve a few iterations.
6. **Documentation:** After your PR is merged, update any relevant website
   documentation if necessary.

Tips:

:white_check_mark: Do:

- Check for existing issues before creating a new one.
- Fill out the issue and PR templates completely.
- Write tests for your code changes if applicable. This helps ensure your
  contribution doesn't break existing functionality.
- Follow the contribution guidelines and coding style outlined in the
  [Developer Handbook](../docs/developer-handbook.md).

:no_entry_sign: Don’t:

- Branch off of another branch.
- Mix unrelated changes in the same PR.
- Submit massive PRs if the changes can be broken down into smaller ones.

<!--
TODO: Is this section necessary? Other than the Gatsby theme, it's basically
saying 'you can contribute to nearly anything in this repo' which is implied by
the fact that it's an open source project.
-->

### What projects can I contribute to?

- [`@carbon/styles`](https://github.com/carbon-design-system/carbon/tree/main/packages/styles)
- [`@carbon/react`](https://github.com/carbon-design-system/carbon/tree/main/packages/react)
- [`@carbon/web-components`](https://github.com/carbon-design-system/carbon/tree/main/packages/web-components)
- [`carbon-website`](https://github.com/carbon-design-system/carbon-website)
- [`gatsby-theme-carbon`](https://github.com/carbon-design-system/gatsby-theme-carbon)
- [`carbon-design-kit`](https://github.com/carbon-design-system/carbon-design-kit)
- [`@carbon/elements`](https://github.com/carbon-design-system/carbon/tree/main/packages/elements)
- [`@carbon/colors`](https://github.com/carbon-design-system/carbon/tree/main/packages/colors)
- [`@carbon/grid`](https://github.com/carbon-design-system/carbon/tree/main/packages/grid)
- [`@carbon/icons`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons)
- [`@carbon/icons-react`](https://github.com/carbon-design-system/carbon/tree/main/packages/icons-react)
- [`@carbon/layout`](https://github.com/carbon-design-system/carbon/tree/main/packages/layout)
- [`@carbon/motion`](https://github.com/carbon-design-system/carbon/tree/main/packages/motion)
- [`@carbon/themes`](https://github.com/carbon-design-system/carbon/tree/main/packages/themes)
- [`@carbon/type`](https://github.com/carbon-design-system/carbon/tree/main/packages/type)

And more! See a complete list
[here](https://github.com/carbon-design-system/carbon/tree/main/packages).

### How else can I contribute?

Great question! You can contribute without directly creating or maintaining
assets:

<!--
TODO: Are these the internal Slack channels? If so, why are they listed here?
-->

- **Join our Slack community:** Engage with hundreds of users in channels like
  `#carbon-react`, `#carbon-web-components`, `#carbon-design-system`,
  `#carbon-ng`, `#carbon-vue`, and `#carbon-announcements`.
- **Report bugs:** Even if you can’t submit a fix, opening a well-documented
  issue makes a big difference.

### Do I need to submit code for every framework?

While the core team maintains the React and Web Component implementations, other
framework teams work to maintain parity. If you fix a bug in one framework for a
component that exists in multiple frameworks, either submit a fix for the other
versions or open an issue so we can update them.

### How can I test components or share a bug reproduction?

<!--
TODO: Should
`[Carbon Design System Sandboxes](https://github.com/carbon-design-system/sandboxes)`
be somewhere in here? If so, should it be its own thing or should it replace one
or both of the `Stackblitz` and `Codesandbox` sections below?
-->

Use in-browser development environments:

#### Stackblitz

- [`@carbon/react` template](https://stackblitz.com/github/carbon-design-system/carbon/tree/main/examples/vite?file=src%2FApp.jsx)

#### Codesandbox

- [`@carbon/react` template](https://codesandbox.io/s/github/carbon-design-system/carbon/tree/v11.2.0/examples/codesandbox)
- [`@carbon/styles` template](https://codesandbox.io/s/github/carbon-design-system/carbon/tree/v11.2.0/examples/codesandbox-styles)
