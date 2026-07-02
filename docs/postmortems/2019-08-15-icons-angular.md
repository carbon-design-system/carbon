---
date: 2019-08-15
authors: joshblack
---

# `@carbon/icons-angular` v10.5.0 broken build

**Summary**:

The v10.5.0 release of the Carbon Design System shipped a broken build of
`@carbon/icons-angular`.

**Impact**

This impacted teams that used the caret ranges (`^`) in the `10.x` range for
tracking the `@carbon/icons-angular` dependency. In particular,
`carbon-components-angular` has specified `^10.1.0` as a range for the
`@carbon/icons-angular` `peerDependency`. This could result in teams who are
installing fresh versions of these dependencies to use the broken `v10.5.0` when
it was released.

**Root causes**:

When the Carbon Design System core team introduced an option to
[down size icons to 16px](https://github.com/carbon-design-system/carbon/pull/3501),
they encountered a build-related issue with the `@carbon/icons-angular`. The
recommendation at the time was to comment out the build step so that the team
could proceed. Unfortunately, the `private` field was not also added to the
package to prevent it being published during this broken state. In addition,
there was no prompt in the GitHub UI for a final review from the
`@carbon/icons-angular` `CODEOWNERS` specified in the project.

**Resolution**

Since `v10.5.0` was recently released, we decided to use the `unpublish` feature
of `npm` that is valid within 72hours of a release. Running this command
subsequently unpublished the broken build of `@carbon/icons-angular` and
restored `v10.4.0` as the `latest` package for teams to consume.

**Detection**

This issue was first reported by @cal-smith

**Action Items**

| Action item                                                    | Owner      | Bug                                                      |
| -------------------------------------------------------------- | ---------- | -------------------------------------------------------- |
| Update `package.json` in `@carbon/icons-angular` to be private | @joshblack | https://github.com/carbon-design-system/carbon/pull/3744 |

## Lessons learned

**What went well**

- The time it took to resolve the issue was fast after it was first reported

**What went wrong**

- We contributed code that took away the underlying build functions without
  setting the package to `private` to prevent accidental publishing

**Where we got lucky**

- We were still within the 72 hour time period required by `npm` for their
  `unpublish` feature to work

## Timeline

2015-08-15 **(all times in UTC)**

- 17:50: @cal-smith initially reached out to @joshblack on Slack first reporting
  the broken icon build
- 19:30: Dean Williams also followed up on Slack to report the underlying issue
- 19:38: @joshblack acknowledged the underlying issue and reported an ETA on a
  fix
- 20:07: @joshblack unpublished `v10.5.0` of `@carbon/icons-angular` after
  confirmation from @cal-smith

## Supporting information
