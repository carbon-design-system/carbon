---
date: 2019-10-07
authors: joshblack
---

# Breaking change in 10.6 for `ContentSwitcher`

**Summary**

<!-- What is a one or two-line summary of the event that occurred? -->

A breaking change was introduced in 10.6 for `ContentSwitcher` that impacted
consumers in two ways:

1. The function signature for handlers changed, namely `onChange`
2. The focus implementation lead to focus being stolen whenever a re-render
   occured in the control

**Impact**

<!-- What was the scope of impact from the event occuring? How many teams were
impacted? -->

This breaking change impacted all users who downloaded the September release of
the Carbon Design System, notably `10.6.x` and `7.6.x` ranges.

**Root causes**:

<!-- Looking back, what ended up being the main reasons why this event occurred?
-->

We targeted `ContentSwitcher` as a good candidate for a React hooks migration.
Unfortunately, the migration updated parts of the public API in a
semver-incompatible way causing a breaking change.

**Detection**

<!-- How did we find out or discover that this event had occurred? -->

We were notified on GitHub and Slack about this potential breaking change.

**Resolution**

<!-- How did we end up addressing this event in order to mitigate impact? -->

We reverted to the previous behavior of the component using GitHub's UI.

**Action Items**

<!-- What are the action items that came out of this postmortem? Reference
issues and Pull Requests in the "Bug" column with the appropriate owners -->

| Action item                | Owner      | Bug                                                              |
| -------------------------- | ---------- | ---------------------------------------------------------------- |
| Revert to the old behavior | @joshblack | [Link](https://github.com/carbon-design-system/carbon/pull/4250) |

## Lessons learned

**What went well**

- We were able to cleanly revert the breaking change

**What went wrong**

- In the course of refactoring we changed a portion of the public API of a
  component that caused breaking changes
- Our response time to a breaking change was long enough that some teams had
  implemented a fix already for the broken code
- Even though we noticed a breaking change in the component, we ended up
  implementing fixes for in in our website projects instead of addressing the
  breaking change

**Where we got lucky**

## Timeline

_Note: times that were hard to determine are marked as 09:00_

2019-09-23 **(all times in UTC-5)**

- 09:00 @justindm234 reported the breaking change as an issue on the Carbon
  monorepo

2019-09-30

- 09:00 @emyarod replied with related issues flagged on the Carbon website
  properties that were subsequently addressed

2019-10-04

- 06:27 A community on #carbon-react reached out about the possibility of a
  breaking change introduced in `carbon-components-react` in `10.6`
- 08:30 @joshblack replied with a link to the existing issue for the breaking
  change
- 13:06 @joshblack shared an internal poll to gain feedback on whether or not to
  revert the breaking change
- 05:00 @joshblack opened a PR to revert the breaking change identified in the
  issue thread. It was not merged as we wanted to verify the fix

2019-10-07

- 08:16 A community member on #carbon-react reached out about a focus-related
  bug that was also introducing in the breaking change. In this case, any state
  update would trigger the `ContentSwitcher` to steal focus
- 04:00 @joshblack confirmed the bug and decided to open a PR that reverted the
  underlying refactor PR for an earlier behavior

## Supporting information

<!-- Any additional information that you might reference earlier on in the
postmortem -->

- [Link](https://github.com/carbon-design-system/carbon/issues/4063) to initial
  issue created
- [Link](https://github.com/carbon-design-system/carbon/pull/4230) to Pull
  Request for initial bug fix
- [Link](https://github.com/carbon-design-system/carbon/pull/4250) to PR that
  reverts the refactoring work done
