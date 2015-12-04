# Contributing to Bluemix Components

# Forks

**What's a fork?**

A fork is a copy of a repo.

**Why forking?**

* Opens up project for anyone to contribute.
* Experiment with changes without affecting the original project
* Propose changes safely without affecting the original project.
* Source: [GitHub](https://help.github.com/articles/fork-a-repo/)

## Fork The Repo:

* Go to [bluemix-components](https://github.ibm.com/Bluemix/bluemix-components) and click the "Fork" button in the top-right corner

## Clone Your Fork:

* Go to your GitHub profile.
* Find bluemix-comonents.
* Copy the **SSH clone URL**.
* `git clone git@github.ibm.com:YOUR_USERNAME/bluemix-components.git`

See [GitHub docs](https://help.github.com/articles/fork-a-repo/) for more details.


## Remotes

**What's a remote?**

A remote is a connection to other repos.

## Add Remotes

When you clone your personal repo, you will see `origin` is set up for you already by default. This should be pointing to your personal repo.

```
git remote add upstream git@github.ibm.com:puppycat/forking.git
git remote add brian git@github.ibm.com:bthan/forking.git
```

* `origin`: connection to your fork
* `upstream`: connection to the original project.
* `brian`: connection to `brian`'s fork.


## Work in a Branch

```
git checkout -b component/card/refactor

# Edit some code
# Add and Commit your code
```

## Update Your Branch

```
git checkout master
git pull upstream master
git checkout your/feature/branch
git rebase master
git push origin your/feature/branch
```

## Squash Your Commits

![squash](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/4241/9d2f075a-99d3-11e5-94a5-c49bd1ead5d2.gif)

### 0. Git Log

**Tip:** Make alias for more detailed git log

* To see where your branch begins
* To see what commits are tagged

```
git log --pretty=format:'%C(red)%d%Creset %C(yellow)%h%Creset %s' --graph --abbrev-commit

*  (HEAD, docs/contributing/simplify) 86f51b0 Add code snippets that walkthrough interactive rebase
*  4385c3b Squash your commits section
*  0d7a0be squash commits gif
*  1f73b82 Rewrite CONTRIBUTING.md to be simpler
*    (tag: 2.2.0-alpha, upstream/master, origin/master, origin/HEAD, master) 85c9a86 Merge pull request #355 from bthan/component/global-header/themes-mixins
```

### 1. Start Interactive Rebase

Interactive Rebase will alter every commit that happened after master.

This is where we begin to squash commits.

```
git rebase -i master

```
* This is the same as doing:
	* `git rebase -i origin/master`
	* `git rebase -i upstream/master`
	* `git rebase -i origin/master`
	* `git rebase -i 2.2.0-alpha`
	* `git rebase -i HEAD~5`

### 2. Squash Commits

```
pick 1f73b82 Rewrite CONTRIBUTING.md to be simpler
squash 0d7a0be squash commits gif
squash 4385c3b Squash your commits section
squash 86f51b0 Add code snippets that walkthrough interactive rebase
squash d8b98c6 Add git log stuff
squash 4f6afd0 Format text in Squash Commits section
```

By default, your OS X terminal or iterm is set to use `vi` as its text-editor when using `git`.

* Press `i` on your keyboard to start typing
* Write `p` or `pick` before the first commit.
* Write `s` or `squash` before every commit.
* Press `esc` on your keyboard to stop typing.
* Type `:wq` to write and quit (aka save and exit)
	* Type `:q!` to abort all changes made in this editor.

### 3. Write New Commit Message

```
# This is a combination of 7 commits.
# The first commit's message is:
Rewrite CONTRIBUTING.md to be simpler

Add stuff about rebasing

# This is the 2nd commit message:

squash commits gif

# (Omitting other commits for brevity...)
```
After picking and squashing, text editor will open again.
* You can rewrite your commit message or leave it as is.
* `:wq` to save and quit.

### 4. Force Push

```
git push -f origin your/feature/branch
```

## Pull Requests

*Coming Soon*
