# Updating Bluemix Components

Everything you need to know about updating to Bluemix Components

## Why Update?

#### Latest Designs

The newest versions of Bluemix Components captures the latest, codified designs. It's important to regularly update Bluemix Components to drive consistency in our product for our users.

Using code from Bluemix Components also saves you from writing all the front-end code yourself.

#### Accessibility

We're able to test for color-contrast ratio and semantic markup within the context of each element and component. Our accessibility coverage is expanding to include keyboard navigation and other tenants of accessibility.

#### Bug Fixes

When we see bugs, we fix them right away.
Keeping up to date with the latest Bluemix Components will help keep your front-end code working as intended.

## Minor Updates and Patches

Patches and Minor updates are **non-breaking** changes.

:white_check_mark: Always update Bluemix Components to use the latest patches and minor updates.

#### Patches

Updating from `6.0.0` to `6.0.1` is a patch.

Patches are bug fixes but can also contain other small changes:
  * Small refactoring changes to JS or SCSS
  * Add or update tests
  * Add or update documentation

#### Minor Updates

Updating from `6.0.0` to `6.1.0` is a minor update

Minor updates usually consist of adding new components or elements or new features.

## Major Updates

:fire: Major updates are **breaking** changes.

* `5.0.0-alpha` to `6.0.0` is a major update.

:books: Before installing a major update, read the release notes for a comprehensive list of changes, removals and additions that could affect your code.

Major updates can consist of the following changes:
* Remove a file
* Rename a file
* Changes to HTML
* Drastic changes to SCSS or JS



## CSS from [Bluemix.Common](https://github.ibm.com/Bluemix/Bluemix.Common)

:+1: Use **header.css** ([`/api/v4/css/header.css`](https://dev-console.stage1.ng.bluemix.net/api/v4/css/header.css)). This provides all the needed CSS for the Common Header.

:no_entry_sign: Do not use [**common.css**](https://github.ibm.com/Bluemix/Bluemix.Common/blob/master/public-legacy/api/v2/css/common.css).

**common.css** was stood up for Interconnect and not meant to be a long term solution for using Bluemix Components and other common styles.

Updates to this file will break your front-end code without notice.

All teams should be installing Bluemix Components with `npm`, `bower` or by [downloading](https://github.ibm.com/Bluemix/bluemix-components/tags) source code.
