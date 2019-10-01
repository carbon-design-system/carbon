# Contributing

- Setup instructions
  - Node v10.x (recommend nvm)
  - git
  - Yarn
  - Editor of choice
- GitHub instructions
  - How to fork
    - Add upstream
  - Making changes in a branch
    - Link out to developer handbook for code practices
  - How to make a pull request

## Prerequisites

To contribute to Carbon, you'll need to install:

- [node(v10 or higher)](https://nodejs.org/en/download/)(you can download it
  here or follow their installation through a package manager
  [here](https://nodejs.org/en/download/package-manager/))
  - We recommend using
    [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) as your version
    manager for Node.
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [yarn](https://yarnpkg.com/en/docs/install#mac-stable)

You will also need to have a GitHub account. Head over to
[github.com](https://github.com/) to make an account.

Finally you'll need a code editor to make changes to Carbon. There are many to
choose from but some popular options are
[VSCode](https://code.visualstudio.com/), [Atom](https://atom.io), and
[Sublime](https://www.sublimetext.com/).

With that all done, you're ready to start contributing to Carbon!

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
$ git pull origin master
$ git checkout -b {your-branch-name}
```

### 5. Start the development server

To start your development server, run:

```sh

yarn dev
```

Once it's done building, you can start editing source code or creating new
components. The system is set up to automatically bundle your changes/additions.
Visit http://localhost:3000 to see the changes happen on the fly.

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
issue does not exist, create a new issue. We will not accept pull requests
without an associated issue.

When you're at a good stopping place and you're ready for feedback from other
contributors and maintainers, **push your commits to your fork**:

To do so, go to your terminal and run:

```sh
$ git add -A
$ git commit -m "YOUR  COMMIT MESSAGE HERE"
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
