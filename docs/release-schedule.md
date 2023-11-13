# Carbon Design System Release Schedule

This is a living document outlining the plan for previous, current, and future
major versions of the Carbon Design System.

| Release | Status      | Initial release | Begin Active | Begin Maintenance | End of life |
| ------- | ----------- | --------------- | ------------ | ----------------- | ----------- |
| `main`  | unstable    | unstable        | unstable     | unstable          | unstable    |
| v9      | End of life | 2018-06-04      | 2018-06-04   | 2019-03-29        | 2022-03-31  |
| v10     | Maintenance | 2019-03-29      | 2019-03-29   | 2022-03-31        | 2024-09-30  |
| v11     | Active      | 2021-08-06      | 2022-03-31   | 2025-03-31        | 2027-03-31  |
| v12     | Unreleased  | 2024-08-01      | 2025-03-31   | 2027-03-31        | 2029-03-31  |

> Dates are subject to change

![schedule](https://github.com/carbon-design-system/carbon-website/assets/3360588/02d05990-200c-4380-8acd-82dfbc27483d)

## Release phases

### Prerelease

The prerelease phase is intended to be the opportunity for early adopters,
library authors, and other strategic ecosystem partners to begin to evaluate and
integrate new changes into their codebases. For v11, this phase was eight months
long and spanned four prerelease/beta releases. We hope to extend this timeframe
even further for our next major.

### Active

Consuming projects should always aim to follow the Active release.

A release in the Active phase receives biweekly minor releases containing new
features and fixes. The work we deliver into `main` every day is considered
unstable. Every two weeks we package up these changes into a new minor version
that is published from `main` to the current Active major.

For a look at what types of changes consitute patch, minor, or major version
bumps, see the
[versioning documentation](https://github.com/carbon-design-system/carbon/blob/main/docs/guides/versioning.md).

For a look into the process the Carbon team uses to release packages contained
within the monorepo, see the
[release documentation](https://github.com/carbon-design-system/carbon/blob/main/docs/release.md).

### Maintenance

For a release in the Maintenance phase, patch releases are published containing
security patches and critical bug fixes. When a version moves from Active to
Maintenance, consuming projects should begin migrating to the new Active major
version.  During Maintenance we also consider adding non-critical bug fixes on
an ad hoc basis, by request only. To request a fix be back-ported to a
Maintenance release, please
[open an issue](https://github.com/carbon-design-system/carbon/issues/new?assignees=&labels=type%3A+bug+%F0%9F%90%9B&projects=&template=BUG_REPORT.yaml&title=%5BBug%5D%3A+)
and include a link to the v11 fix pull request.

Changes required for critical security and bug fixes may lead to semver-major
changes landing within a release stream, such situations will be rare and will
land as semver-minor. Although, those changes should have a revert option
included.

The term 'supported release lines' will be used to refer to all release lines
that are not End-of-Life.

## Accessibility

Active release lines are tested using IBMa's `accessibility-checker` in a real
browser environment to ensure accessibility compliance. The most current ruleset
is used for these automated tests. These tests cover default component states,
complex/interior component states (like open, focused, etc.) as well as keyboard
navigation flows.

Rulesets are a moving target though. What was once fully compliant can be
non-compliant again as new standards, rules, and techniques are required in new
rulesets.

Beginning with v11, tests are run against the most current ruleset at the time
of release. Versions are not re-tested against newer or older rulesets. For
instance, v11.35.0 was released on Aug 17 2023 and at the time the current
ruleset was the `August 09 2023 Deployment`. This release was not tested on
prior rulesets and will not be tested on rulesets newer than the
`August 09 2023 Deployment`. Rulesets and their deployment dates can be found on
the
[IBM Accessibility website](https://www.ibm.com/able/requirements/checker-rule-sets/).

For these reasons, we recommend staying up to date with the latest active
version line to ensure the greatest accessibility compliance, particularly when
a new major version is released.

`Maintenance` release lines are not tested against newer rulesets. If you're
using a maintenance release line, there may be gaps in accessibility that you
will need to patch yourself or submit a fix by
[opening a pull request](https://github.com/carbon-design-system/carbon/blob/main/.github/CONTRIBUTING.md).

## Assets managed under this release schedule

This plan covers the design and development assets under maintenance of the
Carbon Design System core team. This includes the `@carbon/react` and
`@carbon/styles` packages, as well as all other packages within the
[`carbon` monorepo](https://github.com/carbon-design-system/carbon).

This plan also includes all design guidance and design kit assets (figma, etc.)
present in the
[`carbon-website`](https://github.com/carbon-design-system/carbon-website) and
[`design-kit`](https://github.com/carbon-design-system/carbon-design-kit)
repositories.

## Acknowledgements

This document was heavily inspired by the work of the
[NodeJS Release Working Group](https://github.com/nodejs/release).

The schedule graph was generated using
[our fork](https://github.com/carbon-design-system/lts-schedule) of
[`nodejs/lts-schedule`](https://github.com/nodejs/lts-schedule)
