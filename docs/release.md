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
| [Previous release](#postrelease)     | Determine if new changes to v10 are present and need published, and do so if needed.  |

### Prerelease

The prerelease occurs on the first Tuesday of a sprint. During this stage, the
release team will need to do the following:

- [ ] Run the
      [Version Workflow](https://github.com/carbon-design-system/carbon/actions/workflows/version.yml)
      to automatically generate the prerelease versions for packages

![Screenshot of the version workflow with a way to manually trigger the action](https://user-images.githubusercontent.com/3901764/169147024-32b18e39-ab9a-4048-a3f6-75d4ab94d37e.png)

- [ ] Specify `preminor` as the release type
- [ ] Provide the tag for the release. For example, if the previous release was
      `v11.1.0` this tag would be `v11.2.0-rc.0`
- [ ] Review and approve the Pull Request generated from this action
- [ ] When the Pull Request is merged, pull down the latest code from
      `upstream`, tag it, and push it to `upstream`

```bash
git checkout main
git pull upstream main
git tag -a v11.2.0-rc.0 -m 'v11.2.0-rc.0'
git push upstream v11.2.0-rc.0
```

- [ ] Verify that this triggers a run of the
      [Release Workflow](https://github.com/carbon-design-system/carbon/actions/workflows/release.yml)
- [ ] Review and approve the Pull Request generated from this action on the
      [Carbon Website](https://github.com/carbon-design-system/carbon-website)
      to verify no breaking changes have occurred in this release

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
        was `v11.1.0-rc.0` this tag would be `v11.2.0`
- [ ] Review and approve the Pull Request generated from this action
- [ ] When the Pull Request is merged, pull down the latest code from
      `upstream`, tag it, and push it to `upstream`

```bash
git checkout main
git pull upstream main
git tag -a v11.2.0 -m 'v11.2.0'
git push upstream v11.2.0
```

- [ ] Verify that this triggers a run of the
      [Release Workflow](https://github.com/carbon-design-system/carbon/actions/workflows/release.yml)
- [ ] Review and approve the Pull Request generated from this action on the
      [Carbon Website](https://github.com/carbon-design-system/carbon-website)
      to verify no breaking changes have occurred in this release

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

### Post release

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

## Previous releases

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

You can use the [prerelease](#prerelease) and [stable release](#stablerelease)
steps above to release the previous major version of the Design System. The only
significant difference will occur when you run a workflow for versioning or
releasing. In these situations, you will need to select the correct tag to the
run the workflow from instead of using the default `main`.
