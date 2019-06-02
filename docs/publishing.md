# Publishing

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Pre-release](#pre-release)
- [Release](#release)
- [Publishing older library versions](#publishing-older-library-versions)
- [FAQ](#faq)
    - [How do I fix the repo state if I cancel during a publish?](#how-do-i-fix-the-repo-state-if-i-cancel-during-a-publish)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

> Steps for publishing the monorepo

1. Make sure your local branch is up-to-date by running
   `git pull upstream master`
2. Run `yarn sync` to make sure all packages are synced
3. Make sure your git status is clean (will also be checked in our publish
   task), if not commit and push changes, then go to Step 1
4. Make sure dependencies are up-to-date by doing `yarn clean` && `yarn install`
5. Run `yarn build` to build all package assets
6. Run `yarn lerna version` with the appropriate flags (see release steps below)

## Pre-release

6. Run the following command using `lerna` to version packages

```bash
yarn lerna version \
  <bump>           \    # See `lerna version --help` for all options
  --exact          \    # Updates package.json if direct dependency
  --preid <id>     \    # Specify suffix in version, only alpha, beta, and rc
  --no-push        \    # Don't push to the git origin
  --no-git-tag-version  # Don't create a git tag
```

7. Confirm package changes
8. Add changes with `git add -A`
9. Create a commit message with the following format:
   `git commit -m 'chore(release): vX.Y.Z`
10. Generate the release changelog with the following command:

```bash
npx conventional-changelog-cli -p angular -i CHANGELOG.md -s -r 1
```

10. Make a PR with the proposed changes
11. After the PR is approved and merged, it's time to publish using the
    following commands:

```bash
# Get latest changes from upstream master branch
git checkout master
git pull upstream master

# Clean up local project and build from scratch
# Note: there should be no staged files, can verify by running
# `git status --porcelain`
yarn clean && yarn install --offline --frozen-lockfile && yarn build

# Publish from package with specific dist tag, can be:
# alpha, beta, rc
yarn lerna publish from-package --dist-tag <tag>
```

12. After the packages are published, you can tag and push the tag upstream:

```bash
# Tag after publish
git tag -a vX.Y.Z

# Push tag upstream
git push upstream vX.Y.Z
```

## Release

6. Set `GH_TOKEN` in your terminal ENV, the specific value will be for the
   `carbon-bot` functional ID and can be received from another team member.
7. Export value above by writing `export GH_TOKEN=XYZ`
8. Run
   `./tasks/publish.sh ---exact --conventional-commits --github-release --git-remote upstream`

## Publishing older library versions

We offer ad-hoc backwards-support for older version of the system. This work is
primarly driven by external contributors who may still need these older versions
for legacy code. When updates are received and merged into the codebase, the
release process will be a bit different than the one described above.

For example, with
[`carbon-components-react`](https://github.com/carbon-design-system/carbon-components-react)
we have specific branches for older major versions like `v5` or `v6`. If we
wanted to publish an update to either of these major versions, this process
would look like:

- Checkout the branch locally, making sure to pull in the latest from upstream
- Manually update `package.json` with the new version to publish in a branch
  called `chore/release-vX.Y.Z` and a commit message: `chore(release): vX.Y.Z`
- Create a Pull Request with this new branch and commit message
- Once this is merged into the branch, checkout locally and pull latest. Now we
  can publish by running `npm publish .`, if you want to do a dry run first you
  can do `npm publish . --dry-run`. This is helpful when dependencies may be
  different than in newer versions of the system

One important thing to verify is that `package.json` has a `publishConfig` field
that looks like the following:

```json
{
  "publishConfig": {
    "tag": "<VERSION>.x"
  }
}
```

For example, `carbon-components-react` v5 would look like:

```json
{
  "publishConfig": {
    "tag": "5.x"
  }
}
```

This tag verifies that when we publish we do not publish to the `latest` tag but
instead to the major-specific tag for the package.

After running `npm publish .` and seeing the package publish to the registry,
you could create a git tag by running:

```bash
git tag -a vX.Y.Z # The commit message should match vX.Y.Z
```

You should then push this tag to the project by running:

```bash
git push upstream vX.Y.Z
```

This helps keep track of what versions have been published and snapshotting the
code at that point in time.

## FAQ

#### How do I fix the repo state if I cancel during a publish?

The first things Lerna will do are create a git tag and update `package.json`
versions. If you cancel before any packages publish, then you can do the
following:

```bash
# Delete the specific tag, usually something like v0.1.0
git tag -d name-of-tag
```

```bash
# Undo the last commit
git reset HEAD~

# Remove all staged files
git checkout -- .
```

You should be good to go after this!
