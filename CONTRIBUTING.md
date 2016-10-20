# Contributing

## Requirements

Set up your SSH Key GitHub Enterprise account and install node.js 4 or higher:

* [Generating SSH Keys - GitHub](https://help.github.com/articles/generating-ssh-keys/)
* [`NVM` (node version manager)](https://github.com/creationix/nvm) to use the latest version of `node.js` (4 or higher).

This project uses [Webpack](http://webpack.github.io/docs/tutorials/getting-started/).
See [webpack.config.js](https://github.ibm.com/Bluemix/bluemix-components-react/blob/master/.storybook/webpack.config.js) for details.

## 1. Fork The Repo:

Go to [bluemix-components-react](https://github.ibm.com/Bluemix/bluemix-components-react) and click the "Fork" button in the top-right corner.

## 2. Clone Your Fork:

* Go to your GitHub Enterprise profile.
* Find bluemix-components-react.
* Copy the **SSH clone URL**.

In your terminal:

```sh
git clone git@github.ibm.com:{ YOUR_USERNAME }/bluemix-components-react.git
cd bluemix-components-react
```

See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more details.

## 3. Add Remotes

When you clone your personal repo, you will see `origin` is set up for you already by default. This should be pointing to your personal repo.

```sh
git remote add upstream git@github.ibm.com:Bluemix/bluemix-components-react.git

# List all your remotes
git remote -v
```

When you do `git remote -v`, you'll see these remotes:
* `origin`: connection to your fork
* `upstream`: connection to the original project.

## 4. Work in a Branch

* Always work in a branch.
* Submit pull requests from a branch.
* *Do not submit pull requests from the `master` branch of your fork.*

```
git checkout -b { YOUR_BRANCH_NAME }
git add .
git commit -m "Update header with newest designs, resolves #123"
```

* [Close a commit via commit message](https://help.github.com/articles/closing-issues-via-commit-messages/)
* [Writing good commit messages](https://github.com/erlang/otp/wiki/Writing-good-commit-messages)

## 5. Develop components using dev server

* Start the dev server (which uses [React Storybook](https://github.com/kadirahq/react-storybook)):

  ```sh
  npm run storybook
  ```

Open browser to [http://localhost:9001/](http://localhost:9001/)

* develop components in their respective folders (elements, components, containers or internal)

* [write stories](https://getstorybook.io/docs/basics/writing-stories) for your component in the .storybook folder.


## 6. Test your code

Test your changes by running our test commands:

* Run linting

  ```sh
  npm run lint
  ```

* Run unit tests

  ```sh
  npm run test
  ```

* Run both linting and unit tests

  ```sh
  npm run check
  ```

* Watching unit tests:

  ```sh
  npm run test-watch
  ```

* Generate code coverage report (stored in .gh-pages/coverage folder)

  ```sh
  npm run coverage
  ```

If you add any features to our code, make sure to add tests so that your code is covered.
Tests are written using [JEST](https://github.com/facebook/jest).
You can see how well your code is covered by looking at the `.gh-pages/coverage/lcov-report/index.html` file after running the coverage command.

## 7. Deploy react-storybook to gh-pages

You can optionally deploy your changes to the [gh-pages](https://github.ibm.com/Bluemix/bluemix-components-react/tree/gh-pages) branch so they can be viewed [here](https://pages.github.ibm.com/Bluemix/bluemix-components-react):

  ```sh
  npm run deploy
  ```

## 8. Make a Pull Request

**Note:** Before you make a pull request, search the issues at https://github.ibm.com/Bluemix/bluemix-components-react/issues to see if a similar issue has already been submitted. If the issue does not exist, create a new issue.

When you're at a good stopping place and you're ready for feedback from other contributors and maintainers, **push your commits to your fork** (be sure to run `npm run check` before pushing, to make sure your code passes linting and unit tests):

```
git push origin { YOUR_BRANCH_NAME }
```

In your browser, navigate to [Bluemix/bluemix-components-react](https://github.ibm.com/Bluemix/bluemix-components-react) and click the button that reads "Compare & pull request"

![pull request](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/9135/2dadf224-ca8e-11e5-8eba-bdbe6d698b08.png)

Write a title and description then click "Create pull request"

![write pull request](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/9126/099cd824-ca88-11e5-89d7-94458a4d9ae3.png)
* [How to write the perfect pull request](https://github.com/blog/1943-how-to-write-the-perfect-pull-request)

## 9. Updating a Pull Request

Stay up to date with the activity in your pull request. Maintainers will be reviewing your work and making comments, asking questions and suggesting changes to be made before they merge your code.

:tada: You no longer need to squash commits :tada:

When you need to make a change, add, commit and push to your branch normally.

Once all revisions to your pull request are complete, a maintainer will squash and merge your commits for you.
