# Reviewing pull requests in `carbon-design-system/carbon`

- **Maintainers**: use this as a guide for evaluating PRs 🕵️
- **Contributors**: use this as a guide for what to include in your PRs so
  they'll sail through review ⛵

> [!IMPORTANT]  
> This just serves as a starting point. It will not include every small nit and
> detail that might end up in a PR review.
>
> This document should remain as small as possible! The longer this gets, the
> more difficult it will be to read and absorb.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

## Table of Contents

- [Review Process](#review-process)
  - [1. Initial Review](#1-initial-review)
  - [2. Functional Testing](#2-functional-testing)
  - [3. Code & CI Verification](#3-code--ci-verification)
  - [4. Visual Regression & Merge Conflicts](#4-visual-regression--merge-conflicts)
  - [5. Final Review & Merge Preparation](#5-final-review--merge-preparation)
- [Items to Review by Change-Type](#items-to-review-by-change-type)
  - [PublicAPI (semver) Changes](#publicapi-semver-changes)
  - [React Changes](#react-changes)
  - [Web Components changes](#web-components-changes)
  - [Storybook Changes](#storybook-changes)
  - [Testing Changes](#testing-changes)
  - [Style Changes](#style-changes)
  - [Workflow/CI Changes](#workflowci-changes)
  - [Icon Changes](#icon-changes)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Review Process

### 1. Initial Review

- **PR Body & Issue Context:**
  - Read the PR description to understand the overall scope.
  - Review the related issue (or design spec) to grasp the root problem and
    context.

### 2. Functional Testing

- **Deploy Preview:**
  - Open the deploy preview and test the changes as described in the
    “testing/reviewing” section.
- **Local Testing (Optional):**
  - [Check out the PR locally](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/checking-out-pull-requests-locally)
    using the `gh` CLI, if needed.
  - Run `yarn` and `yarn build` to update dependencies and build
    artifacts/assets.
    - You can build only the affected packages with \
      `yarn lerna run build --scope='@carbon/{packageName}' --include-dependencies`

### 3. Code & CI Verification

- **Code Review:**
  - Review [changes by type](#items-to-review-by-change-Type)
- **CI Checks:**
  - Verify that all CI checks pass.
  - If any checks fail:
    - Inspect logs and comment with suggestions (e.g., update tests or
      snapshots).
    - Add the
      https://github.com/carbon-design-system/carbon/labels/status%3A%20failing%20CI%20%F0%9F%99%85%E2%80%8D%E2%99%82%EF%B8%8F
      label.
    - If you suspect a false positive, re-run or restart the check.

### 4. Visual Regression & Merge Conflicts

- **Percy VRT:**
  - Manually review and approve Percy’s visual regression test results (noting
    that false positives can occur).
- **Merge Conflicts:**
  - If conflicts exist:
    - Comment on the PR to alert the author.
    - Add the
      https://github.com/carbon-design-system/carbon/labels/status%3A%20merge%20conflict%20%F0%9F%9A%AB
      label.
    - Optionally, resolve conflicts locally if you can.

### 5. Final Review & Merge Preparation

- **Submit Review on Files Changed:**
  - Use the review options:
    - **Comment:** Group feedback or ask clarification questions.
    - **Approve:** Mark the PR as approved.
    - **Changes Requested:** Block merging until required updates are made.
- **Post-Review Actions:**
  - Add the
    https://github.com/carbon-design-system/carbon/labels/status%3A%20one%20more%20review%20%F0%9F%91%80
    label if applicable.
  - After the second review:
    - Remove all `status` labels.
    - Add the
      https://github.com/carbon-design-system/carbon/labels/status%3A%20ready%20to%20merge%20%F0%9F%8E%89
      label and queue the PR for merging.
    - [Enable auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request#enabling-auto-merge)

## Items to Review by Change-Type

### PublicAPI (semver) Changes

- **Snapshot & Versioning:**
  - Compare PublicAPI snapshot changes against the
    [versioning documentation](https://github.com/carbon-design-system/carbon/blob/main/docs/guides/versioning.md).
  - Verify that any PropTypes/Types changes are backwards-compatible (widening
    is allowed; narrowing is a breaking change).
- **Testing:**
  - Ensure tests pass; if the snapshot is outdated, update with `yarn test -u`
    and push the changes.

### React Changes

- **Breaking Changes:**
  - Review removals or modifications that might break functionality in stable
    components.
- **useEffect Usage:**
  - [You might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)!
    Remove them if they're unecessary.
  - Ensure the dependency array is complete.
  - Check that any suppression comments (disabling eslint rules) are justified.
  - Confirm that missing dependency arrays aren’t hiding logic that belongs in
    the render function.
  - Validate that refs are not mistakenly used as dependencies (since refs do
    not trigger re-renders).
- **useRef Usage:**
  - Use optional chaining (e.g., `ref?.current`) to avoid null pointer issues.
- **Imperative Code:**
  - Avoid using imperative DOM queries (e.g., `document.querySelector()`) in
    favor of refs.
- **Server-Side Rendering (SSR):**
  - Use `useWindowEvent` instead of `window.addEventListener` to accommodate
    SSR.
  - Prefer `useIsomorphicEffect` over `useLayoutEffect`.
- **Internationalization:**
  - Replace any hardcoded visible text (labels, help text, etc.) with the
    appropriate markup or string handling to support right-to-left languages.
- **Performance Optimizations:**
  - Suggest improvements such as `useCallback` or `useMemo` where applicable.
  - [Example discussion](https://github.com/carbon-design-system/carbon/pull/16076#discussion_r1556189277)
    for reference.

### Web Components changes

- **TBD**

### Storybook Changes

- **Documentation Accuracy:**
  - Confirm that any changes to component APIs are correctly reflected in the
    Storybook docs pages' component api table.
  - Update `component.mdx` files where necessary.
- **Test Story Cleanup:**
  - Remove any test or temporary stories before merging.
- **Args/Controls Functionality:**
  - Ensure that stories have fully working args/controls.

### Testing Changes

- **Testing Practices:**
  - Prefer using `screen` over `container` for queries.
  - Use accessible queries to improve test reliability.
- **Coverage:**
  - Ensure unit tests cover new props, functionality changes, and baseline
    component behavior.
  - Validate accessibility changes with AVT tests.
  - Cover the default story and other component states/stories with VRT tests.

### Style Changes

- **Deprecated Variables:**
  - Confirm that no deprecated variables (e.g., `$layout`) are used.
- **Spacing & Sizing:**
  - Use spacing tokens instead of “magic numbers”
    ([style guide reference](https://github.com/carbon-design-system/carbon/blob/a96f67e52ed40097a4e2ebef0495ce3d6c8d433a/docs/style.md?plain=1#L866)).
- **CSS Logical Properties:**
  - Always use
    [CSS logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values)
    instead of fixed properties like `top`, `left`, or `margin-left`.
- **Prefixes & Module Usage:**
  - Ensure that the `#{$prefix}` is applied.
  - Verify that dependent style modules are imported correctly (e.g., Tooltip
    styles depending on Popover styles).
- **Browser testing:**
  - Perform cross-browser test by looking at the changes in major browsers
    (chrome, firefox, edge, safari, opera)
  - Use the storybook viewport width toolbar option to ensure the changes work
    as expected at every major breakpoint

### Workflow/CI Changes

- **CI Guidelines:**
  - [Pin actions to a full length commit SHA](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions#using-third-party-actions)
  - Ensure all workflow modifications should be reviewed by a repo admin

### Icon Changes

- When icon changes occur, follow the
  [process documented in the developer handbook](https://github.com/carbon-design-system/carbon/blob/main/docs/developer-handbook.md#working-with-icons-and-pictograms).
