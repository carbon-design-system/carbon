<!-- alex disable failure -->

# Triaging a new Accessibility Issue

## Severity

There are 4 levels of severity for issues in the Carbon core repositories:

- Severity 1 - "Affects major functionality, no workaround" – User with a
  disability cannot complete a task and no alternative means is provided to
  complete the task.

- Severity 2 - "Affects major functionality, has a workaround" – User with a
  disability will not be able to easily complete a task and no alternative means
  is provided to complete the task or the user can complete the task, but the
  issue affects efficiency because it occurs frequently.

- Severity 3 - "Affects minor functionality, has a workaround" – User with a
  disability will be able to complete the task, but issues may cause confusion
  and unnecessary difficulty.

- Severity 4 - "Affects minor functionality, no workaround needed" – Issue is
  not classified as a WCAG 2.1 A or AA failure. The issue may be a functionality
  or usability bug that should be corrected, or a recommendation to improve the
  accessibility for users with a disability.

As you can see these severity levels describe two stages of broken
functionality:

- Major - major functionality is critical to the user completing the task.
  Whatever has gone wrong has made it impossible for the user to successfully
  complete their task or action.

_Examples of major functionality failing are menus not opening, lack of keyboard
accessibility, poor contrast, or broken builds_

- Minor - minor functionality isn't critical to the user completing the task but
  might make task completion frustrating or difficult.

## Priority

Priority is based on the accessibility compliance of Carbon Components to WCAG
2.1 AA & AAA. There are three tiers:

- Priority: high – W3C WCAG 2.1 A & AA issues that cause a React Component to
  fail accessibility compliance on all \*supported platforms. (Note: Sev 1 & 2
  would typically be set to high.)

- Priority: medium – Accessibility issues that are not included in a current
  standard, but cause frustration to a particular user group. (Note: Sev 3
  should be set to medium if it is not a WCAG A or AA failure otherwise it would
  be high.)

- Priority: low – Accessibility issues on components other than React,
  unsupported platforms, and enhancement requests. (Note: Sev 1-4)

Note:

- Each High Priority issue (fails WCAG 2.1 A & AA) would be labeled
  appropriately and included in the
  [milestone](https://github.com/carbon-design-system/carbon/milestones) for
  May 2020. (i.e. A11y, React, Priority, Severity, etc.)

- All issues for a component should be referenced/linked and fixed at the same
  time.

- Metrics would be based on the percentage of components (revised to 33) that do
  not have any WCAG 2.1 A & AA issues.

- \*Supported platforms included specific OS, browser and AT combinations as per
  IBM requirements: - Windows 10 w/ JAWS on Firefox & Chrome - iOS w/Voiceover
  on Safari - MacOS w/VoiceOver Safari & Chrome
