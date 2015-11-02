# Core Team

This is documentation for team members who are responsible for maintaining the bluemix-components repo. These team members will be known and referred to as the **core team** ([see members](https://github.ibm.com/orgs/Bluemix/teams/bluemix-components-core-team)).

* [Track and Sync with Personal Repos](#track-and-sync-with-personal-repos)
  * [Add Remote](#add-remote)
  * [Sync with Remotes](#sync-with-remotes)
  * [Track a Remote Branch](#track-a-remote-branch)
* [Review Pull Requests](#review-pull-requests)
  * [Make Sure Everything Works](#make-sure-everything-works)
  * [Check that Things are Named Properly](#check-that-things-are-named-properly)
  * [Communicate Offline Feedback on GitHub](#communicate-offline-feedback-on-github)
* [Naming Things](#naming-things)
  * [Slash Notation for Git Branches](#slash-notation-for-git-branches)
  * [HTML and SCSS](#html-and-scss) (Coming Soon)
* [Manage Releases](#manage-releases)
  * [Understanding Semantic Versioning (Semver)](#understanding-semantic-versioning-semver)
  * [Using GitHub Releases](#using-github-releases)


## Track and Sync with Personal Repos

![git-remote-add-mari](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/2732/c344ded0-83b0-11e5-9cfb-cb99bea5703c.gif)

Bluemix projects adopt a [forking workflow]((https://github.ibm.com/Bluemix/bluemix-components/blob/master/CONTRIBUTING.md#forking-workflow)), so there will be contributions coming in from multiple personal repos forked from bluemix-components.

As a core team member, you are required to fork bluemix-components and create your own personal repo (see [contributing docs](https://github.ibm.com/Bluemix/bluemix-components/blob/master/CONTRIBUTING.md#fork-and-clone)) so that you can locally review pull requests and be aware of what contributors are working on in their own personal repos.

We're going to use `git remote` to manage tracking and syncing with branches from other personal repos. We commonly refer to these "personal repos" as "remotes"; both of these names are used interchangeably within this context.

### Add Remote

Before starting, make sure your [personal repo is set up]((https://github.ibm.com/Bluemix/bluemix-components/blob/master/CONTRIBUTING.md#set-up-and-sync-your-personal-repo)).

Here's how you add a remote.

```
git remote add <NAME> <URL>
```

This is similar to adding an `upstream` remote except now we're adding remotes of other personal repos.

As an example, let's say you want to add Mari's personal repo. You would do this:

```
git remote add mari git@github.ibm.com:bthan/bluemix-components.git
```

The `<URL>` will always be an `ssh` url for Mari's personal repo of bluemix-components.
But, you can change the `<NAME>` argument to whatever you want. Name the remote for Brian Han to something that you will be able to recognize.  

For example, these commands will work too:

```
git remote add mjohannessen git@github.ibm.com:mjohannessen/bluemix-components.git
git remote add mojo git@github.ibm.com:mjohannessen/bluemix-components.git
git remote add marijo git@github.ibm.com:mjohannessen/bluemix-components.git
```


### Sync with Remotes

When you want to review someone's pull request, you can use `git fetch --all` to grab all branches from all the remotes you've added.

```
git fetch --all

Fetching origin
Fetching upstream
Fetching brianhan

remote: Counting objects: 66, done.
remote: Compressing objects: 100% (34/34), done.
remote: Total 66 (delta 38), reused 53 (delta 25), pack-reused 0
Unpacking objects: 100% (66/66), done.
From github.ibm.com:bthan/bluemix-components
 * [new branch]      hotfix/docs/typo  -> brianhan/hotfix/docs/typo
   2e39a56..0b4a470  master     -> brianhan/master
```

Verify that you fetched everything.

```
git branch -r
```
* You'll see a list of all branches from various remotes: `origin`, `upstream`, `brianhan` and any other remotes you added.

### Track a Remote Branch

This is the last step before being able to review someone's pull request locally.

Let's say there's a pull request from `brianhan` that's contained in a branch called `brianhan/hotfix/docs/typo`.

You can checkout into this branch to review his work by doing:
```
git checkout --track brianhan/hotfix/docs/typo
```

See [Tracking Branches @ git-scm.com](http://git-scm.com/book/ch3-5.html#Tracking-Branches) for more details.

## Review Pull Requests

Only core team members can approve pull requests to be merged into `master`. It's important that it's well known what to look for when reviewing pull requests.

The core team follows a set of general guidelines that start with leveraging this [great article from GitHub](https://github.com/blog/1943-how-to-write-the-perfect-pull-request#offering-feedback) for reviewing and collaborating on pull requests.

To expand on this, here are some additional guidelines for reviewing pull requests:

### Knowing What's Been Changed and Why
* Every pull request should have a good description of what the pull request is about.
* If you, as a reviewer, are unclear about what the purpose of the pull request is, ask the contributor to elaborate.

### Make Sure Everything Works
* Make sure SCSS files are compiling correctly. Run `gulp sass` or `gulp build` and double-check `dev.css` to make sure nothing fishy is going on in there (like missing class selectors, invalid selctors, etc.).
* Make sure JavaScript files are minifying and concatenating. Run `gulp js` or `gulp build` and double-check `_scripts.js` for any concatenation errors.
* In general, make sure nothing else is breaking.

### Check that Things are Named Properly
Code should be using our [class-naming convention]() which applies to:
* HTML (classes)
* SCSS (variables, extends, mixins)
* For more details, see [Naming Things](#naming-things)

### Communicate Offline Feedback on GitHub
When feedback or decisions are made offline: core team members should comment on pull requests with details about any offline conversations as it relates to the pull request.

## Naming Things

We apply naming conventions to **git branches**, **HTML classes** and various parts of **SCSS** code.

### Slash Notation for Git Branches

We've opted to use **slash notation** (`/`) when we name our git branches.

So when we checkout into new branches, branch names will be structured like this:
```
<category>/<sub-category>/<short-description>
```
And actual branch names will look something like this:

```
git checkout -b component/pagination/change-colors
```

Here are some more examples of other common branch names:
```
# base-element branch
git checkout -b base-element/buttons/change-colors

# component branch
git checkout -b component/cards/refactor-classes

# hotfix branch
git checkout -b hotfix/gulpfile/add-missing-curly-brace
```

![github-labels](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/2895/2c806fd8-8620-11e5-987e-1daa565a434c.png)

Naming branches with slash notation correlates really well with our [GitHub Labels Guide](https://github.ibm.com/Bluemix/bluemix-components/wiki/GitHub-Labels-Guide)) in the wiki.

When you're naming a branch, using a common label should usually suffice  since it refers to common tasks that contribute to growing, building and maintaining this project.

But feel free to use any of these labels to name your branches as well since each category of label has their own meaning that is understood by the core team memebers and contributors.

There's a [short-n-sweet article](http://www.guyroutledge.co.uk/blog/git-branch-naming-conventions/#slash_notation) here that explains how it works and why it's nice.

Here's an excerpt from the article that sums it up:

> [When creating new branches with slash notation,] git will actually create these as separate folders in the `.git/refs/heads/` directory of your remote repository.

> Throughout the lifetime of a project, using the [slash notation] naming convention, you would end up with a top-level set of folders for each change type with sub-folders of each named feature

This is cool because we can easily correlate a branch name to a GitHub label for issues. This also results in nice tab autocompletion when checking out into branches -- seeing top-level categories of branches then drilling down into the branch you want to checkout.

Here's that tabbing in action.

![sweet-tabbing-action](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/2731/1ff14fac-83b0-11e5-9fda-18ab2a3771e8.gif)

*(Add HTML/SCSS naming conventions here)*

## Manage Releases

Bluemix Components is only distributed as a private bower package.
As we continue to merge pull requests, we are also responsible for semantically versioning new releases of this bower package.

### Understanding Semantic Versioning (Semver)

Understanding semver is a requirement for managing releases.

Here are two articles that will introduce you to versioning with semver conventions:
* [Semver: A Primer](https://nodesource.com/blog/semver-a-primer) from [nodesource.com](https://nodesource.com/blog/semver-a-primer)
* [Semantic Versioning](http://semver.org/) from [semver.org](http://semver.org/)

Here's an excerpt from "Semver: A Primer" that explains semver well:

> Semver is constructed primarily of three numbers separated by periods (.). The three numbers, in order, are referred to as major, minor and patch.

It's important to understand that each of these three numbers has a semantic meaning. Here's how semver.org explains each number:

> Given a version number `MAJOR.MINOR.PATCH`, increment the:

> * `MAJOR` version when you make incompatible API changes,
> * `MINOR` version when you add functionality in a backwards-compatible manner, and
> * `PATCH` version when you make backwards-compatible bug fixes.

These major, minor and patch numbers determine the latest release order of a package.

> So:
> * Version `0.3.10` is ordered before `0.10.3`
> * Version `0.1.1` is ordered before `1.0.0`
> * Version `1.100.100` is ordered before `10.10.10`


In addition to this, we always prefix the version number with `v` so it looks like this: `v1.0.1`, `v0.2.24`, etc.

### Using GitHub Releases

Bower uses git tags to version bower packages.
In GitHub, we can we can use a feature called "GitHub Releases" to tag and describe updates to our release that will be reflected in the latest bower package.

Here's how you can create a new release on GitHub.

![create-release-gif](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/2726/6e60befc-83a6-11e5-8776-4f89a5db3c6e.gif)

For right now, we are marking all releases to be "pre-release/alpha" releases. This indicates that bluemix-components is not meant to be used in production yet.

To sum it up:
* Give an appropriate semver version number
* Title the release with "Alpha Release <version number>"
* Write a description with details about the changes.
* Mark as pre-release
* Publish

See ["Creating Releases"](https://help.github.com/articles/creating-releases/) on GitHub for details.
