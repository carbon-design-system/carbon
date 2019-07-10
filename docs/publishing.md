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

## Prerelease

Often, our prereleases are when we switch between minor versions of the system.
To do this, we'll need to follow the following steps:

- Make sure you're on the `master` branch for your fork of Carbon
- Pull the latest changes from master with `git pull upstream master`
- Create a new branch following the format: `chore(release): vA.B.C-preid.D`,
  for example `chore(release): v10.4.0-rc.0`
  - A `preid` can be one of `alpha`, `beta`, or `rc` (Release Candidate)
- Next, run the `lerna version` command to correctly version changed packages.
  You can do this by running:

```bash
yarn lerna version preminor \
  --exact \
  --preid rc \
  --no-push \
  --no-git-tag-version \
  -m 'chore(release): update package versions'
```

- Now, you can commit the changes and create a Pull Request for the branch
- After the Pull Request is merged, checkout `master` and pull the latest
  changes
- Make sure everything in your local fork is up-to-date by running:
  - `yarn clean && yarn install --offline && yarn build`
- Use the `lerna publish` command with the `from-package` option to publish
  packages that have changed. You can do this by running:

```bash
yarn lerna publish from-package --dist-tag next
```

- Once the packages are published, create a `git tag` for the release by
  running:

```bash
git tag -a v10.4.0-rc.0 # Supply the version in the tag commit body
```

- You can then push this tag upstream by running
  `git push upstream v10.4.0-rc.0`
- After that, you're done! <span aria-label="Celebrate">🎉</span>

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
