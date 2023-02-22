# Release

> How we version and release packages in the Design System

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Overview](#overview)
- [Release Team](#release-team)
- [Process](#process)
  - [Prerelease](#prerelease)
  - [Stable release](#stable-release)
  - [Post release](#post-release)
- [Previous releases](#previous-releases)
  - [How to determine if the previous major version needs to be released](#how-to-determine-if-the-previous-major-version-needs-to-be-released)
  - [Releasing the previous major version](#releasing-the-previous-major-version)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Overview

The Design System follows a time-based release model where we deliver a stable
`minor` update every two weeks. The full schedule for releases is available
[here](https://github.com/carbon-design-system/carbon/wiki/Release-radar).

We also publish prereleases before every `minor` release. This prerelease
happens several days before the stable release. This offers an integration
window where the prerelease can be tested on products before the stable release.

We also ship security and bug fixes in `patch` releases. This will be shipped
as-needed and do not follow a specific schedule.

## Release Team

The release team is responsible for coordinating the `minor` and `patch`
releases for the Design System in a given week. This group is composed of a
release lead and sidekick. The release lead is responsible for:

- Managing the release itself, including
  - Testing
  - Publishing
  - Support
- Helping the release sidekick understand and run through the release process,
  where appropriate

The release sidekick is responsible for:

- Learning how to run the release process if this is your first time on the
  release team
- Helping out the release lead in the release process, this includes helping
  with testing, publishing, support, and more

## Process

When going through a release, the release team will go through the following
checkpoints:

| Checkpoint                       | Description                                                                                                              |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| [Prerelease](#prerelease)        | Publish a prerelease that will be used to test out the release candidate before becoming stabilized                      |
| [Stable release](#stablerelease) | Graduate the prerelease into a stable release that is available through packages on NPM                                  |
| [Post release](#postrelease)     | Support the latest stable release and address any issues that may come up as a result of promoting the release to stable |
| [Previous release](#postrelease) | Determine if new changes to v10 are present and need published, and do so if needed.                                     |

### Prerelease

The prerelease occurs on the first Tuesday of a sprint. During this stage, the
release team will need to do the following:

- [ ] Run the
      [Version Workflow](https://github.com/carbon-design-system/carbon/actions/workflows/version.yml)
      to automatically generate the prerelease versions for packages

![Screenshot of the version workflow with a way to manually trigger the action](https://user-images.githubusercontent.com/3901764/169147024-32b18e39-ab9a-4048-a3f6-75d4ab94d37e.png)

- [ ] Specify `preminor` as the release type
  - If [releasing another prerelease](#releasing-another-prerelease), specify
    `prerelease` as the release type
- [ ] Provide the tag for the release. For example, if the previous release was
      `v11.1.0` this tag would be `v11.2.0-rc.0`. To find the previous release,
      view the [tag list](https://github.com/carbon-design-system/carbon/tags).
- [ ] Review and approve the Pull Request generated from this action
- [ ] 🛑 Wait for the Pull Request to be merged
- [ ] Once merged, pull down the latest code from `upstream`

```bash
git checkout main
git pull upstream main
```

- [ ] Run `git log` to view the most recent commits
- [ ] Validate the most recent commit is the release commit from the PR. If it
      is not, ensure the PR has been merged and try pulling again.

```
chore(release): v11.2.0-rc.0
```

- [ ] Exit the log by pressing <kbd>q</kbd>
- [ ] Tag the release commit, and push it to `upstream`

```bash
git tag -a v11.2.0-rc.0 -m 'v11.2.0-rc.0'
git push upstream v11.2.0-rc.0
```

- [ ] Verify that this triggers a run of the
      [Release Workflow](https://github.com/carbon-design-system/carbon/actions/workflows/release.yml)
- [ ] Review and approve the Pull Request generated from this action on the
      [Carbon Website](https://github.com/carbon-design-system/carbon-website)
      to verify no breaking changes have occurred in this release

#### Releasing another prerelease

After a prerelease has been published, additional prereleases can be published.
eg. `v11.12.0-rc.0` -> `v11.12.0-rc.1`

To do so, follow the above steps for [Prerelease](#prerelease) but specify
`prerelease` as the release type instead of `preminor`.

### Stable release

A stable release occurs on the first Thursday of a sprint and finishes on the
morning of the first Friday of a sprint. This should occur after the prerelease
has been tested and validated. During this stage, the release team will do the
following:

- [ ] Run the
      [Version Workflow](https://github.com/carbon-design-system/carbon/actions/workflows/version.yml)
      to automatically generate the prerelease versions for packages
  - [ ] Specify `minor` as the release type
  - [ ] Provide the tag for the release. For example, if the previous release
        was `v11.1.0-rc.0` this tag would be `v11.2.0`. To find the previous
        release, view the
        [tag list](https://github.com/carbon-design-system/carbon/tags).
- [ ] Review and approve the Pull Request generated from this action
- [ ] 🛑 Wait for the Pull Request to be merged
- [ ] Once merged, pull down the latest code from `upstream`

```bash
git checkout main
git pull upstream main
```

- [ ] Run `git log` to view the most recent commits
- [ ] Validate the most recent commit is the release commit from the PR. If it
      is not, ensure the PR has been merged and try pulling again.

```
chore(release): v11.10.0
```

- [ ] Exit the log by pressing <kbd>q</kbd>
- [ ] Tag the release commit, and push it to `upstream`

```bash
git tag -a v11.2.0 -m 'v11.2.0'
git push upstream v11.2.0
```

- [ ] Verify that this triggers a run of the
      [Release Workflow](https://github.com/carbon-design-system/carbon/actions/workflows/release.yml)
- [ ] Review and approve the Pull Request generated from this action on the
      [Carbon Website](https://github.com/carbon-design-system/carbon-website)
      to verify no breaking changes have occurred in this release. If the PR
      from the previous release was not merged, the existing PR will be updated.

**Friday**

The packages that have been published will be switched to latest on the first
Friday of a sprint. To make the switch, you will need to:

- [ ] Run the
      [Promotion Workflow](https://github.com/carbon-design-system/carbon/actions/workflows/promote.yml)
      to automatically promote Carbon packages with new release versions to
      latest
- [ ] Verify the packages have been promoted to latest
      [on NPM](https://www.npmjs.com/package/@carbon/react)
- [ ] Update the latest release notes with the generated output from Carbon Cli
      by running at /carbon

`./packages/cli/bin/carbon-cli.js changelog v11.5.0..v11.6.0`

- [ ] Uncheck "this is a prerelease" on the Release

- [ ] Post the release announcement in slack
  - [ ] #carbon-announcements
  - [ ] #carbon-components
  - [ ] #carbon-design-system
  - [ ] #carbon-react

<details>
  <summary>Click to view slack announcement template</summary>

```
:carbon10: :carbon10: :carbon10:

Hi all! :wave: We wanted to share the release notes for [v11.X.Y](https://github.com/carbon-design-system/carbon/releases/tag/v11.X.Y) 🚀

This release includes the following updates that you and your team can use today:

* item
* item
* item
* ... and a number of additional bugs squashed! 🐛

If you want to stay up to date with our release schedule, check out our [Release Radar wiki page](https://github.com/carbon-design-system/carbon/wiki/Release-radar).

If there are any issues that come up while using this release, please reach out on GitHub or Slack to let us know!

Thanks :tada:
— The Carbon team :carbon10:
```

</details>

### Post release

- [ ] Update the
      [release radar wiki page](https://github.com/carbon-design-system/carbon/wiki/Release-radar)

After a release has switched packages from `next` to `latest`, it is important
to monitor channels on Slack and issues on GitHub in case breaking changes may
have occurred in the release.

If issues occur for the specific release, it's important to determine the next
best steps based on the type of issue. Typically, issues fall into one of two
categories:

- Hotfix: if the issue is self contained and can be addressed quickly, going
  through a patch release may be the easiest way to resolve the issue
- Revert to previous stable release: this strategy is helpful if the issue that
  has been identified is not able to be quickly remediated or the timeline is
  unknown

## Previous releases (v10)

We currently support the current and previous major version of the Design
System. While the current major version will receive features and bug fixes, the
previous major version will only receive bug fixes along with any critical
security updates.

### How to determine if the previous major version needs to be released

To help determine if there has been code merged into the v10 branch since the
last v10 release:

- [ ] Go to https://github.com/carbon-design-system/carbon/compare/
- [ ] Open the "base" ref dropdown
- [ ] Choose the "tags" tab
- [ ] Select the most recent v10.x tag
- [ ] Open the "compare" ref dropdown
- [ ] Select the `v10` branch
- [ ] View the diff
  - [ ] If the diff is empty, v10 does not need released
  - [ ] If the diff contains a list of commits, we need to release a new v10.x
        version

Additionally, check
[the PR queue against the v10 base branch](https://github.com/carbon-design-system/carbon/pulls?q=is%3Apr+base%3Av10+sort%3Aupdated-desc).
It might be that there is a PR open and waiting to merge that we could get in to
include in the release.

### Releasing the previous major version

- [ ] Go to your local version of the monorepo
- [ ] Checkout v10 `git checkout v10`
- [ ] Run `git pull upstream v10 --tags`
- [ ] Create a new release branch from main with the intended version to be
      released. To find the previous release, view the
      [tag list](https://github.com/carbon-design-system/carbon/tags).
  - [ ] `git checkout -b release/vX.Y.Z`
- [ ] Run `yarn install`
- [ ] Ensure your working directory is clean via `git status`,
- [ ] Run the following `lerna` command to version packages that have changed
      since the last version

```bash
yarn lerna version patch \
  --no-push \
  --no-git-tag-version
```

- Double-check the version bumps to make sure they match what you're expecting.
  As a patch, they should:
  - NOT include a breaking change (e.g. it should not be v10.14.0 → v11.0.0)
  - NOT include a minor change (e.g. it should not be v10.59.1 -> v10.60.0)
- Hit `y` to confirm changes
- [ ] For a quick sound check, run `yarn install --immutable --immutable-cache`
      to make sure all the versions have been correctly bumped
  - Note: sometimes you will need to update the root `package.json` file
    manually
- [ ] Run `yarn install`
- [ ] Commit the changes to the `package.json` files by running:

```bash
git add -A
git commit -m 'chore(release): vX.Y.Z'
git push --set-upstream origin release/vX.Y.Z
```

- [ ] Make a Pull Request with your branch
  - [ ] Set the `base` branch of the PR to be `v10`
  - [ ] Title of PR: chore(release): vX.Y.Z
  - [ ] Description: Release PR for vX.Y.Z
- [ ] 🛑 Wait for the Pull Request to be merged
- [ ] Once merged, pull down the latest code from `upstream`

```bash
git checkout v10
git pull upstream v10
```

- [ ] Run `git log` to view the most recent commits
- [ ] Validate the most recent commit is the release commit from the PR. If it
      is not, ensure the PR has been merged and try pulling again.

```
chore(release): v10.59.1
```

- [ ] Exit the log by pressing <kbd>q</kbd>
- [ ] Tag the release commit, and push it to `upstream`
  - [ ] Make sure you're setting the correct tag version number. To find the
        previous release, view the
        [tag list](https://github.com/carbon-design-system/carbon/tags).

```bash
git tag -a vX.Y.Z -m 'vX.Y.Z'
git push upstream vX.Y.Z
```

- [ ] Verify that your push triggered a release action
  - [https://github.com/carbon-design-system/carbon/actions?query=workflow%3ARelease](https://github.com/carbon-design-system/carbon/actions?query=workflow%3ARelease)
- [ ] Verify that the action succeeded and the Release was published under the
      `v10-next` tag on npm
- [ ] Generate the changelog by running the following command from the root of
      the monorepo

```bash
./packages/cli/bin/carbon-cli.js changelog vA.B.C..vX.Y.Z
```

### Releasing a new major for a single package

In some cases, a single package in the monorepo may need a major version bump.
This can be done without having to do a major version bump across all packages.

For instance:

- `eslint-config-carbon` needs a new major
- All other packages should only be bumped as a new patch
- The tag for the release should remain at the curent major `v11.x`, and not be
  bumped to `v12.x`

To do this, packages must be versioned manually.

1. Switch to `main`
1. Pull in latest `git pull upstream main`
1. Make a new branch with the version you're going to release, e.g.
   `git checkout -b release/v11.23.1`
1. Run `yarn lerna version --no-git-tag-version --no-push`
1. An interactive prompt will be presented - select the appropriate version bump
   for each package
1. After the interactive prompt is complete, run `yarn install` to update
   `yarn.lock`
1. Commit `chore(release): v11.23.1`
1. `git push` and then open a pull request
1. Once the changes are merged in, follow the same steps for a
   [Stable Release](#stable-release) after the
   `🛑 Wait for the Pull Request to be merged` step to tag the release commit
   and trigger the automated release workflows.

## Troubleshooting

### The Version workflow succeeded, but the PR was not created

Look through the logs - Lerna probably didn't detect any changes that need
published. This can happen if there is nothing new in `main` since the most
recent tag was published. Merging a PR and running the workflow again (don't
re-run the previous one) should fix this.

### Something failed in the Version workflow

If the Version workflow fails for some reason and you can't determine the cause,
you can always run the same commands from the workflow file in your local dev
environment as long as you have push access to the repo.

1. On a clean working directory, pull down the latest from `main` and create a
   `release/vX.Y.Z` branch:

```bash
git checkout main
git pull upstream main
git checkout -b `release/vX.Y.Z`
yarn install
yarn build
```

2. Then run the rest of the commands specified in the `Version.yml` workflow.
   `yarn build`, `yarn lerna ...`, `yarn install`, etc.

3. Commit and push up the changes to a PR and you're at the same step in the
   process as if the Version workflow had succeeded.

```bash
git add .
git commit -m "chore(release): vX.Y.Z"
git push
```

### Something failed in the Release workflow

If the Version workflow fails for some reason and you can't determine the cause,
you can always run the same commands from the workflow file in your local dev
environment as long as you have push access to the repo and publishing access in
npm.

1. Pull down the tag locally:

```bash
git checkout vX.Y.X
```

2. Run the same commands in order from the `Release.yml` workflow.

3. On success, manually create a GitHub release associated with the proper tag,
   and include the generated changelog.

### We're getting reports of unpkg links not working

Reports like
[these](https://github.com/carbon-design-system/carbon/issues/12052#issuecomment-1238383908)
can be the result of unpkg's default behavior of resolving
`https://unpkg.com/carbon-components/*` to the version corresponding to the
`latest` tag.

It's likely that the `latest` tag was erroneously applied to a v11.x version,
causing anyone using a non-versioned unpkg link to begin resolving to the v11
package which does not contain a compiled stylesheet.

To fix, re-apply the `latest` tag to `v10.x` instead of `v11.x`. Any
non-versioned unpkg links should now resolve to `carbon-components@v10.x` again.

```bash
npm dist-tag add carbon-components@10.X.Y latest
```

Instruct users to prevent this in the future by appending `@10` to the package
name to ensure unpkg resolves to the latest v10 version:

`https://unpkg.com/carbon-components@10/css/carbon-components.min.css`
`https://unpkg.com/carbon-components@10/scripts/carbon-components.min.js`

### When running the v10 storybook deploy manually, the v11 storybook is being published to v7-react.carbondesignsystem.com

The workflow needs to be ran from the `v10` branch. Select `v10` from the
dropdown when you run it.

<img width="342" alt="image" src="https://user-images.githubusercontent.com/3360588/214062284-94065d87-5949-43a7-844b-0d1eb25aba16.png">
