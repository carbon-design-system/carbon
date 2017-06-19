# Contribution Guidelines

Want to contribute to this repository? Please read below first:

 - [Issues and Bugs](#issues-and-bugs)
 - [Feature Requests](#feature-requests)
 - [Doc Fixes](#doc-fixes)
 - [Submission Guidelines](#submission-guidelines)
 - [Coding Standards](#coding-standards)
 - [Commit Message Guidelines](#commit-message-guidlines)
 - [Testing](#testing)

## Issues and Bugs

If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to this repo. Even better you can submit a Pull Request with a fix.

**Please see the Submission Guidelines below**.

## Feature Requests

You can request a new feature by submitting an issue to this repo. Proposed features (with suitable design documentation and reasoning) can be crafted and submitted to this repo as a Pull Request.

**Please see the Submission Guidelines below**.

## Doc Fixes

If you want to help improve the docs, it's a good idea to let others know what you're working on to minimize duplication of effort. Comment on an issue to let others know what you're working on, or create a new issue if your work doesn't fit within the scope of any of the existing doc fix projects.

**Please see the Submission Guidelines below**.

## Submission Guidelines

### Setup

1. Fork the project by navigating to the main [repository](https://github.com/carbon-design-system/carbon-components-react) and clicking the **Fork** button on the top-right corner.

2. Navigate to your forked repository and copy the **SSH url**. Clone your fork by running the following in your terminal:

	```
	$ git clone git@github.com:{ YOUR_USERNAME }/carbon-components-react.git
	$ cd carbon-components-react
	```

	See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more details on forking a repository.
	
3. Once cloned, you will see `origin` as your default remote, pointing to your personal forked repository. Add a remote named `upstream` pointing to the main `carbon-components-react`:

	```
	$ git remote add upstream git@github.com:carbon-design-system/carbon-components-react.git
	$ git remote -v
	```

### Submitting an Issue

Before you submit your issue, search the repository. Maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue. Help us to maximize the effort we can spend fixing issues and adding new features, by not reporting duplicate issues.

### Submitting a Pull Request

1. Search this repository for an open or closed Pull Request that relates to your submission. You don't want to duplicate effort.

2. Pull the latest master branch from `upstream`:

	```
	$ git pull upstream master
	```

3. Always work and submit pull requests from a branch. *Do not submit pull requests from the `master` branch of your fork*.

	```
	$ git checkout -b { YOUR_BRANCH_NAME } master
	```
	
3. Create your patch or feature following our [development guidelines](/README.md#development). Make sure to also follow our [coding standards](#coding-standards).

4. Test your branch and add new test cases where appropriate per the [testing guidelines](#testing).

5. Commit your changes using a descriptive commit message.

	```
	$ git commit -a -m "Update header with newest designs, resolves #123"
	```
 
	**Note:** the optional commit -a command line option will automatically "add" and "rm" edited files. See [Close a commit via commit message](https://help.github.com/articles/closing-issues-via-commit-messages/) and [writing good commit messages](https://github.com/erlang/otp/wiki/Writing-good-commit-messages) for more details on commit messages.
	
6. Once ready for feedback from other contributors and maintainers, **push your commits to your fork** (be sure to run `npm run check` before pushing, to make sure your code passes linting and unit tests):

	```
	$ git push origin { YOUR_BRANCH_NAME }
	```
	
7. In Github, navigate to [carbon-design-system/carbon-components-react](https://github.com/carbon-design-system/carbon-components-react) and click the button that reads "Compare & pull request".

8. Write a title and description, the click "Create pull request".
	
	See [how to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request) for more details on writing good PRs.

9. Stay up to date with the activity in your pull request. Maintainers will be reviewing your work and making comments, asking questions and suggesting changes to be made before they merge your code. When you need to make a change, add, commit and push to your branch normally.

	Once all revisions to your pull request are complete, a maintainer will squash and merge your commits for you.


**That's it! Thank you for your contribution!**


## Coding Standards

To ensure consistency throughout the source code, keep these rules in mind as you are working:

### Style Guide

For a set of basic rules and guidelines for developing React components, see [here](https://github.com/airbnb/javascript/tree/master/react#basic-rules).

Feel free to edit/write components in your own style but be wary that we may ask you to make changes while reviewing your pull request.

### Linting

We enforce some style rules for code in this repository using [eslint](http://eslint.org/). You can install a linting addon to a lot of editors and IDEs that will follow our linting rules.

If you decide to not install a linter addon, or cannot, you can run `npm run lint` to get a report of any style issues. Any issues not fixed will be caught during CI, and will prevent merging.

## Commit Message Guidelines

We use commit message guidelines based on the [Angular Commit Conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit), using `Commitizen` as a CLI wizard to walk developers through writing their commit message.  

This CLI wizard can either be installed by the developer to the global `npm` scope by running `npm i -g commitizen`, or it can be used as a dev dependency on this project by running `npm run commit`.

After the commit message has been submitted, it is checked by [`husky`](https://www.npmjs.com/package/husky) and [`validate-commit-msg`](https://www.npmjs.com/package/validate-commit-msg) to ensure it is syntactically correct.

## Testing

If you add any features to our code, make sure to add tests so that your changes are covered. Tests are written using [JEST](https://github.com/facebook/jest). You can see how well your code is covered by looking at the `.gh-pages/coverage/lcov-report/index.html` file after running the coverage command.

Test your changes by running our test commands:

* Run linting:

  ```
  npm run lint
  ```

* Run unit tests:

  ```
  npm run test
  ```

* Run both linting and unit tests:

  ```
  npm run check
  ```

* Watching unit tests:

  ```
  npm run test-watch
  ```

* Generate code coverage report (stored in .gh-pages/coverage folder):

  ```
  npm run coverage
  ```

* Run a11y tests (ran by Travis CI on Pull Requests):

  ```
  npm run test-a11y 
  ```


### a11y testing

If you add a new component to the library, then a new test case added to `a11y/__tests__/a11y-test.js` is required.  After creating a test case based on the existing test cases, run `npm run test-a11y`.  The test will fail, but a JSON file will be created under `a11y/results` that can be used as the baseline for your new test.  Move the JSON file from `a11y/results` to `a11y/baselines` and run `npm run test-a11y` again.  The test should pass this time.  
