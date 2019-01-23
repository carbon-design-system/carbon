# Contribution Guidelines

Want to contribute to this repository? Please read below first:

- [Issues and Bugs](#issues-and-bugs)
- [Feature Requests](#feature-requests)
- [Doc Fixes](#doc-fixes)
- [Submission Guidelines](#submission-guidelines)

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

1. Fork the project by navigating to the main [repository](https://github.com/carbon-design-system/carbon-upgrade) and clicking the **Fork** button on the top-right corner.

2. Navigate to your forked repository and copy the **SSH url**. Clone your fork by running the following in your terminal:

   ```
   $ git clone git@github.com:{ YOUR_USERNAME }/carbon-upgrade.git
   $ cd carbon-upgrade
   ```

   See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more details on forking a repository.

3. Once cloned, you will see `origin` as your default remote, pointing to your personal forked repository. Add a remote named `upstream` pointing to the main `carbon-upgrade`:

   ```
   $ git remote add upstream git@github.com:carbon-design-system/carbon-upgrade.git
   $ git remote -v
   ```

4. Switch to our version of Node. If you are using (nvm [Node Version Manager)](https://github.com/creationix/nvm), you can run `nvm use` to quicky switch Node versions. If you are aren't using nvm, you can still check the `.nvmrc` dotfile in the root of this project to find the major stable version of Node we are using, and then you can switch manually.

### Submitting an Issue

Before you submit your issue, search the repository. Maybe your question was already answered.

If your issue appears to be a bug, and hasn't been reported, open a new issue. Help us to maximize the effort we can spend fixing issues and adding new features, by not reporting duplicate issues.

### Submitting a Pull Request

1. Search this repository for an open or closed Pull Request that relates to your submission. You don't want to duplicate effort.

2. Pull the latest master branch from `upstream`:

   ```
   $ git pull upstream master
   ```

3. Always work and submit pull requests from a branch. _Do not submit pull requests from the `master` branch of your fork_.

   ```
   $ git checkout -b { YOUR_BRANCH_NAME } master
   ```

4. Create your patch or feature.

5. Test your branch and add new test cases where appropriate.

6. Commit your changes using a descriptive commit message.

   ```
   $ git commit -a -m "chore: Update header with newest designs, resolves #123"
   ```

   **Note:** the optional commit -a command line option will automatically "add" and "rm" edited files. See [Close a commit via commit message](https://help.github.com/articles/closing-issues-via-commit-messages/) and [writing good commit messages](https://github.com/erlang/otp/wiki/Writing-good-commit-messages) for more details on commit messages.

7. Once ready for feedback from other contributors and maintainers, **push your commits to your fork** (be sure to run `yarn ci-check` before pushing, to make sure your code passes linting and unit tests):

   ```
   $ git push origin { YOUR_BRANCH_NAME }
   ```

8. In Github, navigate to [carbon-design-system/carbon-upgrade](https://github.com/carbon-design-system/carbon-upgrade) and click the button that reads "Compare & pull request".

9. Write a title and description, the click "Create pull request".

   See [how to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request) for more details on writing good PRs.

10. Stay up to date with the activity in your pull request. Maintainers will be reviewing your work and making comments, asking questions and suggesting changes to be made before they merge your code. When you need to make a change, add, commit and push to your branch normally.

    Once all revisions to your pull request are complete, a maintainer will squash and merge your commits for you.

For all details related to development, make sure to check out our [development
guide](/docs/developing.md)!

**That's it! Thank you for your contribution!**
