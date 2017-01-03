# Contributing

## Requirements

Set up your SSH Key GitHub Enterprise account and install node.js 4 or higher.
* [Generating SSH Keys - GitHub](https://help.github.com/articles/generating-ssh-keys/)
* [`NVM` (node version manager)](https://github.com/creationix/nvm) to use the latest version of `node.js` (4 or higher).

Contributing to bluemix-components requires that you can run this repo locally on your computer.

## 1. Fork The Repo:

Go to [bluemix-components](https://github.ibm.com/Bluemix/bluemix-components) and click the "Fork" button in the top-right corner.

![fork](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/9136/2dbf657c-ca8e-11e5-9558-605d0e372cbd.png)

## 2. Clone Your Fork:

* Go to your GitHub profile.
* Find bluemix-components.
* Copy the **SSH clone URL**.

In your terminal:

```sh
git clone git@github.ibm.com:{ YOUR_USERNAME }/bluemix-components.git
cd bluemix-components
```

See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more details.


## 3. Add Remotes

When you clone your personal repo, you will see `origin` is set up for you already by default. This should be pointing to your personal repo.

```sh
git remote add upstream git@github.ibm.com:Bluemix/bluemix-components.git
git remote add {{YOUR_NAME_HERE}} git@github.ibm.com:{{YOUR_NAME_HERE}}/bluemix-components.git

# List all your remotes
git remote -v
```

When you do `git remote -v`, you'll see these remotes:
* `origin`: connection to your fork
* `upstream`: connection to the original project.
* `bthan`: connection to [Brian Han's](https://github.ibm.com/bthan/bluemix-components) fork.


## 4. Work in a Branch

* Always work in a branch.
* Submit pull requests from a branch.
* All commits must follow the convention outlined [here](https://github.com/conventional-changelog/conventional-changelog/blob/v0.5.3/conventions/angular.md).
* *Do not submit pull requests from the `master` branch of your fork.*

```
git checkout -b { YOUR_BRANCH_NAME }
git add .
git commit -m "fix(table): IE11 positioning error" -m "Fixes #34"
```

* [Close a commit via commit message](https://help.github.com/articles/closing-issues-via-commit-messages/)

## 5. Test your JavaScript code

If you're contributing JavaScript, test your changes by running our test commands:

```sh
gulp test
```

If you add any features to our JavaScript code, make sure adding test so that your code is covered.
Tests are written in [Mocha](https://mochajs.org)/[Chai](http://chaijs.com).
You can see if your code is covered by looking at bluemix-components/tests/coverage/\*/index.html after running test.

If your change may hit some browser quirks, use `-b` option, like:

```sh
gulp test -b IE
```

If you are very sure that your change affects a specific set of components, you can use `-f` option, like:

```sh
gulp test -f tests/spec/fab_spec.js
```

Other options for testing are:

* `-d`/`--debug`: Stop generating code coverage report. Useful to debug your code when running test.
* `-k`/`--keepalive`: Keep running test runner even after test ends. Test will restart running when you make changes to any test files or any files under test.

## 6. Make a Pull Request

**Note:** Before you make a pull request, [search](https://github.ibm.com/Bluemix/bluemix-components/issues) the issues to see if a similar issue has already been submitted. If a similar issue has been submitted, assign yourself or ask to be assigned to the issue by posting a comment. If the issue does not exist, create a new issue.

When you're at a good stopping place and you're ready for feedback from other contributors and maintainers, **push your commits to your fork**:

```
git push origin { YOUR_BRANCH_NAME }
```

In your browser, navigate to [Bluemix/bluemix-components](https://github.ibm.com/Bluemix/bluemix-components) and click the button that reads "Compare & pull request"

![pull request](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/9135/2dadf224-ca8e-11e5-8eba-bdbe6d698b08.png)

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

![base-branch](https://media.github.ibm.com/user/76/files/897f441c-16ca-11e6-9704-eb6f8ac4452a)

Write a title and description then click "Create pull request"

![write pull request](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/9126/099cd824-ca88-11e5-89d7-94458a4d9ae3.png)
* [How to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)


## 7. Updating a Pull Request

Stay up to date with the activity in your pull request. Maintainers from the Design System team will be reviewing your work and making comments, asking questions and suggesting changes to be made before they merge your code.

:tada: You no longer need to squash commits :tada:

When you need to make a change, add, commit and push to your branch normally.

Once all revisiions to your pull request are complete, someone from Design Systems will squash and merge your commits for you.
