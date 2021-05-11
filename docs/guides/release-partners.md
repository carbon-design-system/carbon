# Release Partner Program

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [About](#about)
- [Timeline](#timeline)
- [Updates](#updates)
  - [May 13th, 2021](#may-13th-2021)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## About

This document is for teams participating in our 2021 Release Partner Program for
the Carbon v11 release. To learn more about this program, or to find out how to
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
documentation and support needed to preview the functionality that we've
accomplished so far for Carbon v11.

To get started with the beta release, make sure to download the latest versions
of `carbon-components` and `carbon-components-react`.

```bash
npm i carbon-components@^10.35.0 carbon-components-react@^7.35.0
```

Or, with [Yarn](https://yarnpkg.com/):

```bash
yarn add carbon-components@^10.35.0 carbon-components-react@^7.35.0
```

Next, follow our feature flags guide to enable the appropriate feature flags in
Sass and React. Here's a quick breakdown of the flags that are available and
what features they correspond with:

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

All of the updated design tokens for v11 have been added to each theme and is
used by components. You can use each token today in the same way you use tokens
from Carbon.

For the full list of tokens, visit this link: [Link](https://bit.ly/3bitQLN)

##### Component `size` prop

| Feature flag         | Styles         | React                                |
| -------------------- | -------------- | ------------------------------------ |
| `enable-v11-release` | No flag needed | <span aria-label="checked">✅</span> |

##### CSS Grid

| Feature flag      | Styles                               | React                                |
| ----------------- | ------------------------------------ | ------------------------------------ |
| `enable-css-grid` | <span aria-label="checked">✅</span> | <span aria-label="checked">✅</span> |

##### Icon updates

| Feature flag    | Styles | React |
| --------------- | ------ | ----- |
| No flags needed | N/A    | N/A   |

##### Spacing token updates

| Feature flag    | Styles | React |
| --------------- | ------ | ----- |
| No flags needed | N/A    | N/A   |

#### What's coming up

We're hoping to release a second beta version of v11 in the next couple of
weeks. Inside of this version, we would like to ship the following two parts of
the release:

- The `@carbon/react` package that will become our new entrypoint for developers
  using React
- The `@carbon/upgrade` CLI tool for running automated codemods
- The `@carbon/styles` package

Plex

Inline theming, UI Shell

Component accessibility Notification Tooltip

Removal of deprecated code
