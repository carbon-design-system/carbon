# Contributing to Bluemix Components

* [Forking Workflow](#forking-workflow)
* [Set up and Sync your Personal Repo](#set-up-and-sync-your-fork)
  * [Fork and Clone](#fork-and-clone)
  * [Add Upstream Remote](#add-upstream-remote)
* [Contributing to Source Code](#contributing-to-source-code)
* [Issues](#issues)
* [Run Bluemix Components](#run-bluemix-components)
* [Work in a Branch](#work-in-a-branch)
* [Pull Requests](#pull-requests)
  * [Create a Pull Request](#create-a-pull-request)
  * [Collaborate on a Pull Request](#collaborate-on-a-pull-request)


Hello!

Bluemix Components is a living resource that adapts and changes over time. It's important that we work together in a transparent and consistent manner.

This documentation is for everyone - contributors and core-team members.

As a core-team member, see [CORE-TEAM.md](https://github.ibm.com/Bluemix/bluemix-components/blob/master/CORE-TEAM.md) for essential instructions on maintaining this source code repo.

This document is going to walk you through everything you need to know to collaborate on this source code.

## Forking Workflow

![fork-workflow](https://www.atlassian.com/git/images/tutorials/collaborating/comparing-workflows/forking-workflow/01.svg)

We use a **forking workflow** with feature branches for us to collaborate here on GitHub Enterprise (GHE).

For full details on how this works, Atlassian has a [great tutorial article](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) we encourage you to read - but while you're here, let's talk about how to get things set up.

## Set up and Sync your Personal Repo
In this section, we are setting up remotes for your fork. These remotes are called `upstream` and `origin`.
* The `origin` remote is set up for you by default. This points to your **personal repo** (or a fork) of bluemix-components. You push your code to this remote.
* The `upstream` remote connects your fork with the official bluemix-components repo. You pull code from this repo.

### Fork and Clone

Go to [bluemix-components](https://github.ibm.com/Bluemix/bluemix-components) and fork the repo, you'll find a button called 'fork' in the top-right corner.

![fork](https://help.github.com/assets/images/help/repository/fork_button.jpg)

When you fork the repo, you're creating a **personal public copy** of the bluemix-components repo. This is known as your **personal repo**. Your personal repo will live under your username.

Next, you need to `git clone` your personal repo to your computer.

```
git clone git@github.ibm.com:YOUR_USERNAME/bluemix-components.git
```

See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more details.

### Add Upstream Remote

When you clone your personal repo, you will see `origin` is set up for you already by default. This should be pointing to your personal repo.

```
git remote -v

origin  git@github.ibm.com:YOUR_USERNAME/bluemix-components.git (fetch)
origin  git@github.ibm.com:YOUR_USERNAME/bluemix-components.git (push)
```

Now we need to add an `upstream` remote.

In a nutshell, this will enable you to keep your personal repo up to date with the latest changes from the `master` branch of bluemix-components.

```
git remote add upstream git@github.ibm.com:Bluemix/bluemix-components.git
```

Verify the `upstream` remote has been added.

```
git remote -v

origin  git@github.ibm.com:YOUR_USERNAME/bluemix-components.git (fetch)
origin  git@github.ibm.com:YOUR_USERNAME/bluemix-components.git (push)
upstream    git@github.ibm.com:Bluemix/bluemix-components.git (fetch)
upstream    git@github.ibm.com:Bluemix/bluemix-components.git (push)
```

Now that the `upstream` remote is set up, you can update the `master` branch of your personal repo.

This will update your personal repo on your computer and on GHE.

```
# While in your master branch
git pull upstream master
git push origin master
```

If you're responsible for reviewing and maintaining the Bluemix Components repo, please see docs for [Syncing with Other Forks]() in [CORE-TEAM.md](https://github.ibm.com/Bluemix/bluemix-components/blob/master/CORE-TEAM.md)

# Contributing to Source Code

Once you've set up your personal repo, and your remotes, you can start making your own contributions to the Bluemix Components repo.

## Issues
Before you work on anything, [find](https://github.ibm.com/Bluemix/bluemix-components/issues) an issue to work on or [create](https://github.ibm.com/Bluemix/bluemix-components/issues/new) an issue with a description of what you want to work on (i.e. a bug fix, a new component, refactoring, new docs, etc.)

## Run Bluemix Components
In your terminal, make sure to install npm and bower dependencies.

```
npm install & bower install
```

Run the repo for development.

```
npm run dev
```

This is going to run `gulp` from `node_modules`, which handles various front-end tasks that you need for development. Keep this process running in your terminal.

You should see your browser open to [`http://localhost:3000`](http://localhost:3000) with [dev/index.html](https://github.ibm.com/Bluemix/bluemix-components/blob/master/dev/index.html)

This is an html file for you to see what components or base-elements you're working on and how they render in the browser.

As a contributor, you should only be working in the [dev](https://github.ibm.com/Bluemix/bluemix-components/tree/master/dev) folder, which is used to build [bower-dist](https://github.ibm.com/Bluemix/bluemix-components/tree/master/bower-dist) and [npm-dist](https://github.ibm.com/Bluemix/bluemix-components/tree/master/npm-dist). These dist folders are what we distribute to our users via npm and bower.

## Work in a Branch
Pull down the latest changes from `upstream`.

```
# While in master branch
git pull upstream master
```

Checkout into a new branch for the work you're doing.
Name your branch using slashes.

*(Branch naming convention coming soon)*

```
# component branch
git checkout -b component/cards/refactor-classes

# hotfix branch
git checkout -b hotfix/gulpfile/missing-curly-brace

# feature branch
git checkout -b feature/some-feature/details-about-feature

# task-runner branch
# docs branch
```

Commit frequently with short messages in present-tense. Periodically push to your branch. Also run `gulp build` to build out the dist folders, just to be safe.

*(Do we need standards around squashing commits?)*

```
gulp build
git add <path/to/file>
git commit -m "Add missing semicolon"
git push origin <branch-name>
```

## Pull Requests

Pull requests are how we perform code reviews (the same idea applies to writing docs as well). This is where we do a lot of communication and share constructive criticism, so it's required that everyone **be respectful**.

See our [Code of Conduct](https://github.ibm.com/Bluemix/bluemix-components/wiki/Code-of-Conduct) for details.

### Create a Pull Request

After pushing your last commit(s), visit the [Bluemix/bluemix-components](https://github.ibm.com/Bluemix/bluemix-components/blob/master) and you can find a button that says to 'Create pull request'.

![create-a-pull-request](https://help.github.com/assets/images/help/pull_requests/pull-request-review-create.png)

Sometimes this pull-request button isn't there, so alternatively, you can click on this other pull-request button. It looks like this:

![other-button](https://help.github.com/assets/images/help/pull_requests/pull-request-start-review-button.png)

Clicking this other button will take you to a 'Compare changes' screen. There are two dropdowns to compare two branches. Change the second dropdown to your branch.

*(does this comepare changes thing even work across forks?)*

![compare-changes](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/2327/f635fd24-7c03-11e5-9011-9aff28daaee5.png)

After clicking on 'Create pull request',
you'll be taken to a form where you can enter a title and description.

Write a description for your pull request starting with:
* A reference to the issue that you're resolving (see [closing issues via pull requests](https://github.com/blog/1506-closing-issues-via-pull-requests))
* Give any extra explanation if needed.


### Collaborate on a Pull Request

Two team members responsible for maintaining Bluemix Components will review your pull request and will:
* Ask questions about your work
* Ask that you make additional changes to your pull request.
* Check to make sure that nothing breaks.

After you get a thumbs up :+1: from two maintainers, you can merge your pull request and delete your branch via the GHE UI.

Once your changes are merged to master, and while you're in the `master` branch, remember to `git pull upstream master` on your fork.

If you're responsible for reviewing and maintaining the Bluemix Components repo, please see docs for [Reviewing Pull Requests]() in [CORE-TEAM.md](https://github.ibm.com/Bluemix/bluemix-components/blob/master/CORE-TEAM.md).
