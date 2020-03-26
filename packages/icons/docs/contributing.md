# Contributing

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Metadata](#metadata)
  - [`icons.yml`](#iconsyml)
  - [`categories.yml`](#categoriesyml)
  - [`deprecated.yml`](#deprecatedyml)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Metadata

The information for each icon that is used by our website is hosted in
[YAML](https://en.wikipedia.org/wiki/YAML) files inside of the icons package,
located [here](../). Different files hold different types of information for our
icons. The most notable ones include:

- [Icon name, friendly name, alias, and size](../icons.yml)
- [Categories for icons](../categories.yml)
- [Deprecations](../deprecated.yml)

You can edit each of these files using GitHub UI by clicking on the "edit" icon.
We go into more detail for each of the file formats below.

### `icons.yml`

This file contains information about an icon's name, "friendly" name, aliases,
and sizes. The friendly name for an icon is what is displayed to an end-user on
our website. The name for an icon matches the asset name in our folder of SVG
assets. Similarly, the sizes correspond to the sizes found in our folder of SVG
assets for the given icon. Finally, alises for an icon are used during search as
alternative ways of finding the icon.

### `categories.yml`

This file contains grouping information for icons and the categories, or
subcategories, to which they belong. Feel free to add or update categories,
subcategories, members, and more in this file.

### `deprecated.yml`

This file contains information mapping assets that have changed in the current
release. Typically, this file will indicate which icons have been renamed or
removed. This file contains a list of deprecated icons with a required `name`
field alongside an optional `reason` field. You can use the `reason` field to
indicate that:

- The icon has been replaced by an alternate icon
- The icon has been removed

Use `deprecated.yml` when assets are renamed to indicate the change. This will
hide the depreacated name from display on the web site, and signal to teams that
the originally named file is a candidate for future removal. It's recommended
that you also add the deprecated name to `aliases` for the asset in `icons.yml`,
so that the new asset name will be a search result for the deprecated name. We
then persist both named assets in the repo for 2 releases to allow teams time to
migrate to the new asset name.

When an asset is removed with no replacement, it is also captured in
`deprecated.yml`. Removed icon assets represent breaking changes and should be
carefully considered. To remove an asset, add the asset name to
`deprecated.yml`; we then persist the to-be removed assets in the repo for 2
releases to allow teams time to migrate to a different asset.
