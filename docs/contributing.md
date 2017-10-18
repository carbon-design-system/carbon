# Contributing

## Requirements

Set up your SSH Key GitHub Enterprise account and install node.js 4 or higher.
* [Generating SSH Keys - GitHub](https://help.github.com/articles/generating-ssh-keys/)
* [`NVM` (node version manager)](https://github.com/creationix/nvm) to use the `Node 6`.

Contributing to carbon-components requires that you can run this repo locally on your computer.

## Class names

Prefix all class names with `bx--`.
This prefix prevents potential conflicts with class names from the user.

__HTML__

```html
<div class="bx--inline-notification bx--inline-notification--error" role="alert">
  <div class="bx--inline-notification__details">...</div>
</div>
```

__SCSS__

```scss
.bx--inline-notification {
  ...
}

.bx--inline-notification__details {
  ...
}
```

Follow BEM naming convention for classes. Again, the only thing we do differently is prefix all classes with `bx--`.

```scss
.bx--block
.bx--block__element
.bx--block--modifier
```

### Start a new `block` or `element`?

A nested element can use a new block name as long as the styles are independent of the parent.

```html
<div class="bx--component">
  <button class="bx--component-button">Button</button>
</div>
```
:point_up: The `bx--component-button` class implies that this button has independent styles from its parent.
Generally, it's preferred to start a new block.

### Red Flags

Avoid names with multiple `__element` names:

- :x: `.bx--card__list__item`
- :white_check_mark: `.bx--card-item`
- :white_check_mark: `.bx--card__item`

## Files and folders

All components belong in `src/components` in their own folder.

Name files and folders using __singular__ form; not plural.

```
button
  - button.html
  - _button.scss
  - button.js
```

Also note that all variants of a component can live in a single HTML, SCSS and JS file respectively.
For example, while there are many button variants (primary, secondary, etc.), they're all contained in those single source files in the button folder.

## 1. Fork The Repo:

Go to [carbon-components](https://github.com/carbon-design-system/carbon-components) and click the "Fork" button in the top-right corner.

## 2. Clone Your Fork:

* Go to your GitHub profile.
* Find carbon-components.
* Copy the **SSH clone URL**.

In your terminal:

```sh
git clone git@github.com:{ YOUR_USERNAME }/carbon-components.git
cd carbon-components
```

See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more details.

## 3. Add Remotes

When you clone your personal repo, you will see `origin` is set up for you already by default. This should be pointing to your personal repo.

```sh
git remote add upstream git@github.com:carbon-design-system/carbon-components.git
git remote add {{YOUR_NAME_HERE}} git@github.com:{{YOUR_NAME_HERE}}/carbon-components.git

# List all your remotes
git remote -v
```

When you do `git remote -v`, you'll see these remotes:
* `origin`: connection to your fork
* `upstream`: connection to the original project.
* `bthan`: connection to [Brian Han's](https://github.com/bthan/carbon-components) fork.

## 4. Work in a Branch

* Always work in a branch.
* Submit pull requests from a branch.
* All commits must follow the convention outlined [here](https://github.com/conventional-changelog/conventional-changelog/blob/v0.5.3/conventions/angular.md).

> __Writing commit messages__
>
> - `<type>` indicates the type of commit that's being made. This can be: `feat`, `fix`, `perf`, `docs`, `chore`, `style`, `refactor`
> - `<scope>` The scope could be anything specifying place of the commit change or the thing(s) that changed.
>
> __Commit message format:__
> ```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

*Do not submit pull requests from the `master` branch of your fork.*

```
git checkout -b { YOUR_BRANCH_NAME }
git add .
git commit -m "fix(table): IE11 positioning error" -m "Fixes #34"
```

* [Close a commit via commit message](https://help.github.com/articles/closing-issues-via-commit-messages/)

## 5. Test your JavaScript code

If you're contributing to our JavaScript code, test your changes by running our test commands:

```sh
gulp test:unit
```

If you add any features to our JavaScript code, make sure to add tests so that your code is covered.
Tests are written in [Mocha](https://mochajs.org)/[Chai](http://chaijs.com).
You can see if your code is covered by looking at carbon-components/tests/coverage/\*/index.html after running test.

If your change may hit some browser quirks, use `-b` option, like:

```sh
gulp test:unit -b IE -b Firefox
```

(Other browsers tests can run with are: `Safari`, `Chrome` and `ChromeHeadless`)

If you are very sure that your change affects a specific set of components, you can use `-f` option, like:

```sh
gulp test:unit -f tests/spec/fab_spec.js
```

Other options for testing are:

* `-d`/`--debug`: Stop generating code coverage report. Useful to debug your code when running test.
* `-k`/`--keepalive`: Keep running test runner even after test ends. Test will restart running when you make changes to any test files or any files under test.
* `-v`/`--verbose`: Let Karma emit detailed log.

## 6. Test your HTML/CSS code for a11y

If you're contributing to our HTML/CSS code, a11y compliance of your code should be tested.

To do so - First, (if you haven't done already) set up an auth token for a11y rules, by:

1. Create AAT token, by:
  1. Go to https://aat.mybluemix.net/auth/
  1. Enter IBM ID/password as you log into Bluemix
  1. Accept user agreement
  1. Hit Copy Authentication Token button
1. `> sed -e "s|\${NPM_TOKEN}|(The token obtained in above step)|g" < .aat.yml.src > .aat.yml`

Then you can test your changes by running our test commands:

```sh
gulp test:a11y
```

If you are very sure that your change affects a specific set of components, you can use `-f` option, like:

```sh
gulp test:a11y -f consumables/html/components/fab/fab.html
```

The a11y test may report potential issues that should be handled in application-level, not in carbon-components code. In such case, you can ignore those issues by adding an item to `shouldIssueBeIgnoredForRule` table in [tests/a11y/global-ignore-aat-issues.js](https://github.com/carbon-design-system/carbon-components/blob/master/tests/a11y/global-ignore-aat-issues.js). The table is keyed by something like `wcag20.tech.h59.linkValid` which helps indentifying what RPT rule to ignore. You can specify `true` to the value which ignores all violations of the rule, or a function which takes the DOM element violating the rule and returns `true` if such violation should be ignored.

## 7. Make a Pull Request

**Note:** Before you make a pull request, [search](https://github.com/carbon-design-system/carbon-components/issues) the issues to see if a similar issue has already been submitted. If a similar issue has been submitted, assign yourself or ask to be assigned to the issue by posting a comment. If the issue does not exist, create a new issue.

When you're at a good stopping place and you're ready for feedback from other contributors and maintainers, **push your commits to your fork**:

```
git push origin { YOUR_BRANCH_NAME }
```

In your browser, navigate to [carbon-design-system/carbon-components](https://github.com/carbon-design-system/carbon-components) and click the button that reads "Compare & pull request"

> **Is it a Breaking Change?**

> We want to respect semver.
It's important to discern whether your pull request contains breaking changes or not.
Sometimes, renaming or removing things in the code can result in breaking changes.

> Here are some examples of breaking changes...changing, renaming or removing any of the following:
> * HTML attributes
> * Folders or Files
> * Any SCSS `@mixin`, `$variable` or `function`
> * Any JS `function` or `class`

> We also practice **graceful deprecation** when something is slated to be removed -- we mark it as deprecated in the current version and remove it in the next major version.

Before you create a pull request, change the base branch depending on what kind of change you're submitting.

* Pull requests with **non-breaking changes** like patches and minor updates use the `master` as the base branch.
* Pull requests with **breaking changes** use the latest `major version number` branch as the base branch (i.e. `7.0.0` or whatever the next major version is).

Write a title and description then click "Create pull request"

* [How to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)

## 8. Updating a Pull Request

Stay up to date with the activity in your pull request. Maintainers from the Design System team will be reviewing your work and making comments, asking questions and suggesting changes to be made before they merge your code.

:tada: You no longer need to squash commits :tada:

When you need to make a change, add, commit and push to your branch normally.

Once all revisions to your pull request are complete, someone from Design Systems will squash and merge your commits for you.
