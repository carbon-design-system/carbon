# Metadata

## About

We store metadata for a collection of SVG assets to help with searching and
using icons in the Carbon Design System. However, due to the large number of
assets we maintain, we needed to build a system for organizing information about
these icons and creating an output file to be consumed by tooling.

As a result, the Metadata module provides support for building, scaffolding, and
verifying metadata information about a collection of SVG assets. Under the hood,
this module will build up a registry of all available assets and compare them
against metadata files called "extensions". These files are typically written in
YAML and are separated to make authoring of specific types of data easier.

In general, we support the following extension types:

- Icons: provides information for icons available from the source directory of
  SVG assets
- Categories: provides category and subcategory information for a collection of
  icons
- Module name: provides computed names used in code for an icon
- Deprecations: provides a listing of icons that have been deprecated and
  details how to update usage to the preferred format

To support the above use-cases, Metadata makes use of the following concepts:

- [Registry](./registry.js): build up a source of truth for all available SVG
  assets in a source tree
- [Extensions](./extensions/index.js): distinct sources of metadata captured for
  icons. These modules provide support for verifying file structure, extending
  the resulting output metadata, and logical checks to verify information
  present (or not present) in these files
- [Adapters](./adapters.js): provide support for authoring metadata in a variety
  of formats, we currently author in YAML
- [Storage](./storage.js): ability to read and write extension files for a given
  adapter
