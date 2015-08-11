# Contributing to Pattern Library

Hello, developer! Thank you for your interest in contributing to this project.

A pattern library is a living, growing resource that needs to adapt with changes over time. We welcome you to help make this pattern library better than it is today.

## Table of Contents

- [Getting Started](#getting-started)
- [Code of Conduct](#code-of-conduct)
- [Details](#details)
  - [Issues](#issues)
  - [Feature Branches](#feature-branches)
  - [Commit Message Standards](#commit-message-standards)
  - [Submitting Pull Requests](#submitting-pull-requests)
  - [Reviewing Pull Requests](#reviewing-pull-requests)

## Getting Started

### 1. Find or Create an Issue

[Find an issue](https://github.ibm.com/Bluemix/pattern-library/issues), assign yourself so we know what you're working on it.

If you can't find an issue:
  - [Create a new issue](https://github.ibm.com/Bluemix/pattern-library/issues/new)
  - Add the appropriate label
  - Assign yourself

*For more details on working with Issues, [click here](#issues).*

### 2. Get the Repo

Clone the repo and `cd` into **pattern-library**

```
git clone git@github.ibm.com:Bluemix/pattern-library.git
cd pattern-library
```

### 3. Install the dependencies, Check for updates.

You must have **node, npm and ruby** installed on your computer to contribute.

Install the dependencies.

```
npm install
```

Check for any version updates for package.json dependencies and devDependencies.

```
npm run update:check
```

Read the prompt -- if necessary, update package.json and install latest versions of dependencies by running the following commands:

```
npm run update:all
npm update
```

*See [package.json](https://github.ibm.com/Bluemix/pattern-library/blob/master/package.json) for a list of dependencies and devDependencies.*

### 4. Create and Checkout into New Feature Branch

Create a new feature branch with a name that closely matches the work you're doing to resolve the issue(s) you're working on. Then checkout into that new branch. (You can do both of these steps with the git command below)

```
git checkout -b <your-feature-branch-name>
```

*For more details, see [feature branches](#feature-branches)*
### 5. Run the code.

Run the command below -- this starts a server and automatically opens a browser that shows all the rendered code for patterns.

```
npm run dev
```

*See [package.json scripts](https://github.ibm.com/Bluemix/pattern-library/blob/master/package.json#L24) and [gulpfile.js](https://github.ibm.com/Bluemix/pattern-library/blob/master/gulpfile.js) to see what's happening.*

### 6. Work inside the dev folder only.

- Find the pattern you're working on inside the [patterns folder](https://github.ibm.com/Bluemix/pattern-library/tree/master/dev/patterns).
- Update **html, scss and md** files, you'll find these inside each pattern folder.
- The `npm run dev` command will automatically update the browser with changes to **html and scss/css code**.


### 7. Commit and Push your Work

Use git to commit code changes to your feature branch.

```
git add <filename>
git commit -m "your short, concise commit message".
```

Push your commits to your remote feature branch.

```
git push origin <your-feature-branch-name>
```

*See [Commit Message Standards](#commit-message-standards) for best practices around writing good commits.*

### 8. Submit a Pull Request

When you're ready for your code to be reviewed, submit a pull request.
[Visit the repo](https://github.ibm.com/Bluemix/pattern-library) at GitHub Enterprise.

For more details on submitting pull requests, [click here](#submitting-pull-requests).

### 9. Pull Request Review

Get your code reviewed by another IBM developer. Merge your pull request after getting two approvals (:+1). Delete remote feature branch. See [Reviewing Pull Requests](#reviewing-pull-requests) for details.

***

# Code of Conduct

We are all contributors and maintainers of this Pattern Library. We also want to be happy, welcoming and constructive when we are collaborating to grow the work that happens here.

The bottom-line: **Be respectful**.

The following is a detailed list of guidelines that must be followed when participating in the work that happens for the pattern library:

- Respect everyone who contributes in all channels of communication and in all activities of collaboration.
- All communication in all channels (GitHub, Slack, Email, Twitter, etc.) must be constructive and never resort to personal attacks, trolling, public or private harassment, insults or other unprofessional conduct.
- We extend respect to everyone involved regardless of gender, gender identity, sexual orientation, disability, age, race, ethnicity, religion, or level of experience. Everyone who contributes is expected to do the same.

***

# Details

## Issues

- **Always create a new issue**, before contributing any code to the repo.
- Label the issue with the appropriate label (bug, pattern, enhancement, question)
- Explain what the issue is depending on the context of the issue and label.

## Example Issues

### Bug

- Explain what the bug is.
- Explain how to reproduce the bug.

![issue-bug](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/0189/bced242c-4015-11e5-850f-41bc3fbfb538.png)

### Pattern

- This is usually a task for adding a new pattern to the repo
- Include any sub-tasks that needs to be completed.

![issue-pattern](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/0142/18086932-3b81-11e5-9a77-f17dc8d4a99c.png)

### Enhancement

- A general improvement to the source code that doesn't directly relate to patterns.
- This can be [contributing to documentation](https://github.ibm.com/Bluemix/pattern-library/pull/47), adding new tasks to the gulpfile.js, etc.

![Enhancement-example](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/0190/628badc2-4016-11e5-9819-32cea232693f.png)

### Question

- This is a question that someone asks about the repo.

## Feature Branches

If there's something that needs to be added or a bug that needs to be resolved, developers can contribute code using feature branches.

```bash
$ git clone git@github.ibm.com:Bluemix/pattern-library.git
$ cd pattern-library
$ git checkout -b <feature-branch-name>
```

* Work on feature branches that you create. Do not work and commit to *master*.
* Always push to remote branches that match your `<feature-branch-name>`.
* Keep commits as small as possible.
* Push your commits to your remote branch sparingly to allow for rollbacks or amends.

If you're not a contributor, you can work on a forked copy of this repo. In this case, it is still recommended to work on feature branches in order to keep your `master` branch clean and up-to-date with this repo.

## Commit Message Standards

All commits should have meaningful, short, and concise commit messages. A history of good commit messages helps keep a code base maintainable, easy to work with, and failsafe.

General guidelines:
1. Use present tense, imperative mood in the subject line
2. Capitalize the first letter in the subject line
3. Keep the subject line short
4. Don't end the subject line with a period
5. Put any additional text in the body of the commit
6. Separate the subject line and the body with a blank line

## Example Commits

### Do this:

![Good commits](http://i.imgur.com/9CqZmYQ.png)

### Refrain from doing this:

![Bad commits](http://i.imgur.com/soid211.png)

## Submitting Pull Requests

Before submitting a pull request, make sure you do the following:

```bash
$ git fetch --all && git merge master
```

This ensures that the code is up to date with any updates to the master branch and ultimately, avoiding merge conflicts.

When you're ready to push code up to the repo, push your commits to your own remote branch that matches your `<feature-branch-name>`.

```bash
$ git push origin <feature-branch-name>
```

Keep the work inside your branch as small and manageable as possible so maintainers can review and give feedback promptly.
Developers will meet 1-2 times a week to review pull requests on a regular basis.

* Open a pull request when pushing a commit ([hub](https://github.com/github/hub) allows you to do PRs via command line, otherwise you can open them in Github Enterprise).
* Summarize what the pull request is about in the description.
* Where possible, reference a relevant issue that can be updated or closed based on the pull request.
* ~~For a more comprehensive overview of commit standards, see [this doc](https://github.com/cloud-platform-design/cloud-platform-beta/blob/master/Contributing.md).~~

After your pull request is approved:
- click on the **merge pull request** button
- delete your remote feature branch
- In your terminal, pull down the changes from master into your local master branch

```bash
$ git checkout master
$ git pull origin master
```

## Example Pull Request

![example of pull request](http://i.imgur.com/RQcQb5U.png)

## Reviewing Pull Requests

Pull requests are basically like a code review -- this is code that needs to be reviewed before it gets merged into master branch.
Consider everything that's in master branch as production-ready (but don't stress yourself out either).
**Production-ready does not mean perfect**.

Production ready means your code means you won't break master branch and your code makes it better to some degree.

- Pull requests need to have two :+1: from two developers on Bluemix.
- Pull requests are reviewed 1-2 times per week regularly.

The best way to review code is to pull it down to your own computer, run it & **try to break it**, here's how:

Make sure you're in the master branch, pull down any new changes from master.

```bash
$ git branch
$ git checkout master
$ git pull origin master
```

Create a new branch that matches the name of the remote branch that the pull request is using. Than pull down the code from that remote branch.

```bash
$ git fetch --all
$ git checkout <name-of-remote-branch>
$ git pull origin <name-of-remote-branch>
```

At this point, it's possible that you may encounter a **merge conflict**, communicate that to the contributor on their pull request.

The code we're dealing with in the pattern library is mainly HTML, CSS, Sass and JavaScript files.
If you're reviewing HTML code, open the html files in your browser. You can double-click the html files or you can use the `open` command in terminal.

```bash
$ open buttons/primary-button.html
```

As you find areas in their code that should be addressed you can:
- leave constructive comments on their pull request
- ask specific questions about decisions they made in their code.
- approve the pull request with a :+1:
- give pending approval with a :+1: and a comment that says what they need to fix/change before merging to master
- feel free to express your approval with another positive emoji :100: :shipit: :rocket: :whale2:, and state your approval for clarity.
