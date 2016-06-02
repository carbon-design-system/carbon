# Core Team

This is documentation for team members who are responsible for maintaining the bluemix-components repo. These team members will be known and referred to as the **core team** ([see members](https://github.ibm.com/orgs/Bluemix/teams/bluemix-components-core-team)).

## Review Pull Requests Locally

Follow the steps below to review a pull request locally.
Once that's done, refer to the [wiki](https://github.ibm.com/Bluemix/bluemix-components/wiki/Review-Pull-Requests) for how to thoroughly review pull requests before merging.

```
# Add remotes for contributors (name them whatever you want)
git remote add badluckbrian git@github.ibm.com:bthan/bluemix-components.git

# Fetch all branches (easier)
git fetch --all

# Checkout into one of their branches to review
git checkout --track badluckbrian/component/calendar/refactor

# Run the project
npm run dev
```
* `badluckbrian`'s branch is now available locally at `component/calendar/refactor`
* If `badluckbrian` makes more changes to the branch, pull down his changes to your local copy of his branch: `git pull badluckbrian component/calendar/refactor`
* Don't worry about merge commits *you* create on this branch locally.

![git-remote-add-danz](https://uploads.github.ibm.com/github-enterprise-assets/0000/0076/0000/4629/5b4152b8-9da1-11e5-8a52-2bdb16b66ae4.gif)

## Publish New Releases

Bluemix Components is distributed as a private bower and npm package called `bluemix-components`. Use [GitHub releases](https://github.ibm.com/Bluemix/bluemix-components/releases) to draft and publish new versions of the `bluemix-components` bower package. Every version must use `semver` (semantic version) numbers. New versions are published (almost) daily as Pull Requests are merged to the original project. Reference commit history to draft new releases.

### Make a new Pull Request

- Checkout into a `bump/version` branch (i.e. `bump/6.0.1`)
- Update `"version"` in `package.json` and `bower.json`
- `npm run build` to build CSS and JS
- Check in and push all changes
- Merge into master
- Publish new github release pointing to `master` branch

### Versioning

[Read our wiki on Semantic Versioning](https://github.ibm.com/Bluemix/bluemix-components/wiki/Semantic-Versioning-(semver) for full details.

Every release needs a new version number.

Version numbers look like this: `Major.Minor.Patch`
* Patch: When something gets fixed.
* Minor: When something changes, enhances or gets added without breaking changes
* Major: When something changes, gets renamed or removed. These are breaking changes.

### Description

* Describes what's changed in the new release.
* Link to relevant, resolved issues
* Add images or gifs
