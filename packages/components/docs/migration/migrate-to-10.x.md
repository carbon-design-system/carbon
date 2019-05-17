# 10.x Migration

Refer to the
[Carbon X Migration Guide](https://www.carbondesignsystem.com/updates/v10-migration/overview)
for more information on migrating from v9 to v10.

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Components](#components)
- [Styles](#styles)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Components

**IMPORTANT NOTE**: `v9` component styles will be _removed_ soon after the
initial `v10` release.

| Component          | v10                                                                   |
| ------------------ | --------------------------------------------------------------------- |
| Accordion          | [Migrate](../../src/components/accordion/migrate-to-10.x.md)          |
| Breadcrumb         | [Migrate](../../src/components/breadcrumb/migrate-to-10.x.md)         |
| Button             | [Migrate](../../src/components/button/migrate-to-10.x.md)             |
| Carousel           | Removed                                                               |
| Checkbox           | No breaking changes                                                   |
| Code Snippet       | [Migrate](../../src/components/code-snippet/migrate-to-10.x.md)       |
| Combobox           | No breaking changes                                                   |
| Content Switcher   | [Migrate](../../src/components/content-switcher/migrate-to-10.x.md)   |
| Copy Button        | [Migrate](../../src/components/copy-button/migrate-to-10.x.md)        |
| Data Table V2      | [Migrate](../../src/components/data-table-v2/migrate-to-10.x.md)      |
| Data Table         | Removed                                                               |
| Date Picker        | TODO                                                                  |
| Dropdown           | [Migrate](../../src/components/dropdown/migrate-to-10.x.md)           |
| Fab                | Removed                                                               |
| File Uploader      | [Migrate](../../src/components/file-uploader/migrate-to-10.x.md)      |
| Footer             | Removed                                                               |
| Form               | [Migrate](../../src/components/form/migrate-to-10.x.md)               |
| Inline Loading     | [Migrate](../../src/components/inline-loading/migrate-to-10.x.md)     |
| Interior Left Nav  | Removed                                                               |
| Lightbox           | Removed                                                               |
| Link               | No breaking changes                                                   |
| List Box           | No breaking changes                                                   |
| List               | No breaking changes                                                   |
| Loading            | [Migrate](../../src/components/loading/migrate-to-10.x.md)            |
| Modal              | [Migrate](../../src/components/modal/migrate-to-10.x.md)              |
| MultiSelect        | No breaking changes                                                   |
| Notification       | [Migrate](../../src/components/notification/migrate-to-10.x.md)       |
| Number Input       | [Migrate](../../src/components/number-input/migrate-to-10.x.md)       |
| Overflow Menu      | [Migrate](../../src/components/overflow-menu/migrate-to-10.x.md)      |
| Pagination         | [Migrate](../../src/components/pagination/migrate-to-10.x.md)         |
| Progress Indicator | [Migrate](../../src/components/progress-indicator/migrate-to-10.x.md) |
| Radio Button       | [Migrate](../../src/components/radio-button/migrate-to-10.x.md)       |
| Search             | [Migrate](../../src/components/search/migrate-to-10.x.md)             |
| Select             | [Migrate](../../src/components/select/migrate-to-10.x.md)             |
| Slider             | [Migrate](../../src/components/slider/migrate-to-10.x.md)             |
| Structured List    | [Migrate](../../src/components/structured-list/migrate-to-10.x.md)    |
| Tabs               | [Migrate](../../src/components/tabs/migrate-to-10.x.md)               |
| Tag                | [Migrate](../../src/components/tag/migrate-to-10.x.md)                |
| Text Area          | TODO                                                                  |
| Text Input         | [Migrate](../../src/components/text-input/migrate-to-10.x.md)         |
| Tile               | [Migrate](../../src/components/tile/migrate-to-10.x.md)               |
| Time Picker        | [Migrate](../../src/components/time-picker/migrate-to-10.x.md)        |
| Toggle             | No breaking changes                                                   |
| Toolbar            | [Migrate](../../src/components/toolbar/migrate-to-10.x.md)            |
| Tooltip            | [Migrate](../../src/components/tooltip/migrate-to-10.x.md)            |
| Unified Header     | Removed                                                               |

## Styles

**IMPORTANT NOTE**: Most of deprecated variables, mixins and functions will be
_removed_ soon after the initial `v10` release.

| `scss` path         | v10                                                                           |
| ------------------- | ----------------------------------------------------------------------------- |
| `src`               | Deprecated in v10, use `scss` instead [Migrate](../../src/migrate-to-10.x.md) |
| `scss/globals`      | [Migrate](../../src/globals/scss/migrate-to-10.x.md)                          |
| `scss/globals/grid` | [Migrate](../../src/globals/scss/grid/migrate-to-10.x.md)                     |

### Features

| Sass feature        | v10     |
| ------------------- | ------- |
| `font-size` mixin   | Removed |
| `line-height` mixin | Removed |
