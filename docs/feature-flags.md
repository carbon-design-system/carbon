<!-- NOTE: This file is used in the generation of storybook docs page(s). -->

## About feature flags

Carbon packages ship with a collection of feature flags that enable new behavior
and styling. They're a way for consumers to opt-in incrementally to
[preview](https://github.com/carbon-design-system/carbon/blob/main/docs/preview-code.md)
changes while still using the current version. When a new feature flag is
introduced it is marked `false` or "off" by default to ensure backwards
compatibility.

A feature flag can be available in react, web components, sass, or any mix of
these. Flags may also have a related codemod to help migration faster and
easier.

## Current feature flags

Flags prefixed with `enable-*` contain features we'd like consuming projects to
test and give us feedback on. They're generally stable and unlikely to change
but can change based on your feedback.

Flags prefixed with `enable-v12-*` are stable and won't change. They will be
marked as `true` or "on" by default in the next major version, v12.

For more details on this naming convention, see the
[section below](#feature-flag-naming-convention).

Unless otherwise specified, flags are `false` by default.

| Flag                                               | Description                                                                          | Availability | Codemod                                                                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enable-dialog-element`                            | Enable components to utilize the native dialog element                               | React, Sass  |                                                                                                                                                                |
| `enable-enhanced-file-uploader`                    | Enable enhanced FileUploader callbacks with richer data and expanded triggers.       | React        |                                                                                                                                                                |
| `enable-focus-wrap-without-sentinels`              | Enable the new focus wrap behavior that doesn't use sentinel nodes                   | React        |                                                                                                                                                                |
| `enable-presence`                                  | Enable components to remain unmounted in closed state and mount in open state.       | React, Sass  |                                                                                                                                                                |
| `enable-tile-contrast`                             | Enable the improved styling for tiles that provides better contrast                  | Sass         |                                                                                                                                                                |
| `enable-treeview-controllable`                     | Enable the new TreeView controllable API                                             | React        |                                                                                                                                                                |
| `enable-v12-dynamic-floating-styles`               | Enable dynamic setting of floating styles for components like Popover, Tooltip, etc. | React        |                                                                                                                                                                |
| `enable-v12-overflowmenu`                          | Enable the use of the v12 OverflowMenu leveraging the Menu subcomponents             | React        | [enable-v12-overflowmenu](https://github.com/carbon-design-system/carbon/tree/main/packages/upgrade#enable-v12-overflowmenu)                                   |
| `enable-v12-structured-list-visible-icons`         | Enable icon components within StructuredList to always be visible                    | Sass         | [enable-v12-structured-list-visible-icons](https://github.com/carbon-design-system/carbon/tree/main/packages/upgrade#enable-v12-structured-list-visible-icons) |
| `enable-v12-tile-default-icons`                    | Enable default icons for Tile components                                             | React        | [enable-v12-tile-default-icons](https://github.com/carbon-design-system/carbon/tree/main/packages/upgrade#enable-v12-tile-default-icons)                       |
| `enable-v12-tile-radio-icons`                      | Enable rendering of default icons in the tile components                             | React, Sass  | [enable-v12-tile-radio-icons](https://github.com/carbon-design-system/carbon/tree/main/packages/upgrade#enable-v12-tile-radio-icons)                           |
| `enable-v12-toggle-reduced-label-spacing`          | Enable a reduced spacing between the toggle control and its label                    | Sass         |                                                                                                                                                                |
| **Deprecated flags**                               |                                                                                      |              |                                                                                                                                                                |
| `enable-experimental-tile-contrast`                | Deprecated, use `enable-tile-contrast` instead                                       | Sass         |                                                                                                                                                                |
| `enable-experimental-focus-wrap-without-sentinels` | Deprecated, use `enable-focus-wrap-without-sentinels` instead                        | React        |                                                                                                                                                                |

## Documentation

In addition to this document, within each storybook there are "Feature flags"
folders for some components. Docs page(s) within this folder cover the flag
specifics and usage. The stories within in the folder showcase the impact of
when the flag(s) are turned on.

## Using Codemods for Migration

Codemods are code modification scripts that automate the necessary changes when
migrating to new components and APIs. They reduce the manual effort required
when adopting new features. Carbon provides codemods to help you enable feature
flags and migrate to the new APIs these flags provide.

A flag may not have a codemod when:

- A codemod hasn't been written yet.
- The flag is sass-only and used in `.scss` files. We don't offer codemods for
  these at this time.
- The flag guards new behavior that should not require a refactor of your code.

To request, contribute, or enhance a codemod, please
[open an issue](https://github.com/carbon-design-system/carbon/issues/new/choose).

### Running a Codemod

With a clear working directory, run a codemod within your project directory:

```bash
npx @carbon/upgrade migrate <codemod-name> --write
```

Example

```bash
npx @carbon/upgrade migrate enable-v12-overflowmenu --write
```

Changes can be reviewed by looking at your local unstaged file changes in git.

For more information on available codemods, see the
[@carbon/upgrade](https://github.com/carbon-design-system/carbon/tree/main/packages/upgrade/README.md)
documentation.

## Feature flag naming convention

All feature flags follow a prefix naming convention that indicate status.

### Flags prefixed with `enable-*`

- Contain new features that we'd like consuming projects to test
- Are generally stable and unlikely to change but may change based on user
  feedback
- May require some manual migration or code changes within your project
- Are documented in storybook
- May not be documented on https://www.carbondesignsystem.com
- Need user feedback to ensure we've met all concerns relating to this feature

If you use these flags, make sure to check our release notes where we'll outline
any changes to them across our regularly scheduled minor version releases.

### Flags prefixed with `enable-v#-*`

As usage of an existing flag increases or we determine a feature to be of high
importance, we'll "commit" it to a future major release and rename it to use the
`enable-v#-*` prefix. At this point the API or functionality behind this flag is
now fixed and won't change. We intend to ship this flag as "on by default" in
the major version indicated in the name. e.g. `enable-v12-some-feature`

All breaking changes will be shipped as `enable-v12-*` flags within the current
major release (v11). This enables projects to opt-in to breaking changes earlier
and at their own pace avoiding one huge changeset when upgrading to the next
major release. In theory, if all `enable-v12-*` flags are enabled within your
project before the v12 release, no changes should need to be made to the
affected components when updating to v12.

For a flag to be committed to a release and renamed to `enable-v#-*` it must:

- Be tested with early adopters
- Be fully covered in tests (Unit, AVT, and VRT)
- Be documented in storybook
- Be documented on https://carbondesignsystem.com
- Have an automated migration script (codemod) available, where possible
