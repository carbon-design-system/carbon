# Core Team

This is documentation for team members who are responsible for maintaining the bluemix-components repo. These team members will be known and referred to as the **core team** ([see members](https://github.ibm.com/orgs/Bluemix/teams/bluemix-components-core-team)).

## Review Pull Requests Locally

After setting up your `upstream` remote, configure `upstream` to also fetch pull requests (you only do this once):

```sh
git config --global --add remote.upstream.fetch "+refs/pull/*/head:refs/remotes/upstream/pull/*"
```

Now, you can fetch upstream and checkout into the pull request you want to review locally.
```sh
git fetch upstream
git checkout pull/{{ PULL REQUEST NUMBER }}
```

For example:

```sh
# To review Pull Request #1388
git checkout pull/1388
```

🤓 If the contributor has made updates to the PR, you'll be prompted to `git pull` the latest changes into your branch.

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
