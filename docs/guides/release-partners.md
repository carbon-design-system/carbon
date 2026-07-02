# Release Partner Program

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [About](#about)
- [Timeline](#timeline)
- [Updates](#updates)
  - [May 13th, 2021](#may-13th-2021)
    - [What's changed](#whats-changed)
      - [Design Tokens](#design-tokens)
      - [Component `size` prop](#component-size-prop)
      - [CSS Grid](#css-grid)
      - [Icon updates](#icon-updates)
      - [Spacing token updates](#spacing-token-updates)
    - [What's coming up](#whats-coming-up)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## About

This document is for teams participating in our 2021 Release Partner Program for
the Carbon v11 release. To learn more about this program or find out how to
apply, visit our guide
[here](https://github.com/carbon-design-system/carbon/wiki/Release-Partner-Program).

## Timeline

**Note: all dates are an estimate and can be changed**

| Date                        | Release          | Status            |
| --------------------------- | ---------------- | ----------------- |
| Alpha release               | April 15th, 2021 | Published         |
| Beta release                | May 13th, 2021   | Under development |
| Release Candidate 0 release | June 10th, 2021  | Not published     |
| Stable release              | July 1st, 2021   | Not published     |

## Updates

### May 13th, 2021

This is our first beta release for Carbon v11
<span aria-label="celebrate">🎉</span>

Our goal with this release was to present release partners with the
documentation and support needed to preview the functionality we've accomplished
so far for Carbon v11.

To get started with the beta release, make sure to download the latest versions
of `carbon-components` and `carbon-components-react`.

```bash
npm i carbon-components@^10.35.0 carbon-components-react@^7.35.0
```

Or, with [Yarn](https://yarnpkg.com/):

```bash
yarn add carbon-components@^10.35.0 carbon-components-react@^7.35.0
```

Next, follow our [feature flags guide](../migration/v11.x.md#feature-flags) to
enable the appropriate feature flags in Sass and React. Here's a quick breakdown
of the flags that are available and what features they correspond with:

| Feature flag                   | Description                                                                                   |
| ------------------------------ | --------------------------------------------------------------------------------------------- |
| `enable-css-custom-properties` | Enable CSS Custom Property support with our design tokens                                     |
| `enable-css-grid`              | Enable CSS Grid support in Sass and with our React components                                 |
| `enable-v11-release`           | The default flag for v11 functionality. Enable for all updates not covered in the flags above |

Once you've enabled these flags, or if you would like to first check out what
exactly has changed, visit the [changes section](#whats-changed) below.

#### What's changed

For the beta milestone, the following changes have been implemented behind one
of the feature flags described above. When trying out this functionality, we
would love to hear any feedback that you might have in our
[feedback issue](https://github.com/carbon-design-system/carbon/issues/8657).

##### Design Tokens

| Feature flag         | Styles                               | React |
| -------------------- | ------------------------------------ | ----- |
| `enable-v11-release` | <span aria-label="checked">✅</span> | N/A   |

All of the updated design tokens for v11 have been added to each theme and are
used by components. You can use each token today in the same way you use tokens
from Carbon.

```scss
@import 'carbon-components/scss/globals/scss/theme';

.my-component {
  background: $background;
  color: $text-primary;
}
```

For the full list of tokens, visit this link: [Link](https://bit.ly/3bitQLN)

##### Component `size` prop

| Feature flag         | Styles         | React                                |
| -------------------- | -------------- | ------------------------------------ |
| `enable-v11-release` | No flag needed | <span aria-label="checked">✅</span> |

The `size` prop in our React codebase was not consistent across components. This
has been addressed in v11 so that each `size` prop is consistent across the
codebase. The full set of prop names and sizes is below.

Note: there will be a codemod to help with automatically updating the size prop
in our next beta release

| Name  | Size |
| ----- | ---- |
| `xs`  | 24px |
| `sm`  | 32px |
| `md`  | 40px |
| `lg`  | 48px |
| `xl`  | 64px |
| `2xl` | 80px |

The following components have been updated to include this `size` prop change:

- Accordion
- Button
- Listbox
  - Combobox
  - Dropdown
  - Multiselect
  - Filterable Multiselect
- Content Switcher
- DatePicker
- FileUploader
  - FileUploaderButton
  - FileUploaderDropContainer
  - FileUploaderItem
- Link
- Modal
  - ComposedModal
- Number Input
- Overflow Menu
- Search
- Select
- Tag
- Text Input
- Time Picker
- Toggle

##### CSS Grid

| Feature flag      | Styles                               | React                                |
| ----------------- | ------------------------------------ | ------------------------------------ |
| `enable-css-grid` | <span aria-label="checked">✅</span> | <span aria-label="checked">✅</span> |

Starting in v11, we will switch from a flex-box implementation of our grid to a
CSS Grid implementation. We have implemented the initial functionality for our
grid inside of `@carbon/grid`. These styles are a part of the grid exports in
`carbon-components` when the `enable-css-grid` feature flag is enabled.

In addition, our `Grid` and `Column` components will use the updated CSS class
names when the `enable-css-grid` is enabled in JavaScript. Their prop usage
should be identical to the current implementation.

For more information on how to use the `Grid` and `Column` components in React,
check our documentation which will be available next week.

##### Icon updates

| Feature flag    | Styles | React |
| --------------- | ------ | ----- |
| No flags needed | N/A    | N/A   |

Our icons have been updated to optimize the number of exports from our
`@carbon/icons-react` package and simplify the usage of each icon component.

In v10, each icon was exported along with its size. For example, we would have
the following components for the `add` icon: `Add16`, `Add20`, `Add24`, and
`Add32`. In v11, we will have an `Add` component with a `size` prop, with the
default size being 16.

You can try out the new icon updates by installing the latest version of
`@carbon/icons-react`:

```bash
npm i @carbon/icons-react@^10.32.0
```

Or, with [Yarn](https://yarnpkg.com/):

```bash
yarn add @carbon/icons-react@^10.32.0
```

Next, you should import each icon from the `@carbon/icons-react/next`
entrypoint. This entrypoint is temporary during v10 and will be moved to
`@carbon/icons-react` in v11.

For more details on migrating from the v10 icons to v11, check out our
[migration guide](../migration/11.x-carbon-icons-react.md).

_Note: there will be a codemod to help with automatically updating icon usage in
our next beta release_

##### Spacing token updates

| Feature flag    | Styles | React |
| --------------- | ------ | ----- |
| No flags needed | N/A    | N/A   |

We deprecated our `layout` scale in v10 in preference of a unified spacing
scale. This change has been made in v10 and requires no updates or feature flags
in your codebase.

The impact of this change is that the following tokens are deprecated:

- `$layout-01`
- `$layout-02`
- `$layout-03`
- `$layout-04`
- `$layout-05`
- `$layout-06`
- `$layout-07`

And the spacing scale has one new token: `$spacing-13`.

#### What's coming up

Our goal is to release a second beta version of v11 in the next couple of weeks.
For this milestone, we are looking to ship two key parts of this release:

- The `@carbon/react` package that will become our new entrypoint for developers
  using React
- The `@carbon/upgrade` CLI tool for running automated codemods

In addition, this release will include the first beta of the `@carbon/styles`
package which will be our next package for styles. This package will be
re-exported by `@carbon/react`.

In addition, our team is either tackling or will begin to tackle the following
efforts over the next couple of sprints:

- Updates to IBM Plex, moving from Google Fonts to a more robust solution to
  include more font families and weights, along with the variable font for IBM
  Plex Sans
- Inline theming support with our new tokens, including support for zones and
  the ability to support the layering concepts for our token system
  - This work should coincide with our UI Shell theming efforts
- Updates to React, including:
  - Component accessibility updates to follow WCAG AA 2.1 standards
    - Tooltip
    - Notification
    - Disclosure
