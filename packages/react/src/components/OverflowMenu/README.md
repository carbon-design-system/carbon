# `OverflowMenu` component

> Overflow Menu is used when additional options are available to the user and
> there is a space constraint. Create Overflow Menu Item components for each
> option on the menu.

## Table of Contents

<!-- To run doctoc, just do `npx doctoc README.md` in this directory! -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This component comes with any installation of the `carbon-components-react`
package on NPM. You can install this package by running the following in your
terminal:

```bash
npm i carbon-components carbon-components-react carbon-icons --save
# Or, with yarn
yarn add carbon-components carbon-components-react carbon-icons
```

## Usage

You can include `OverflowMenu` and `OverflowMenuItem` by doing the following in
your project:

```js
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';
```

You can then create the menu by the following:

```js
<OverflowMenu>
  <OverflowMenuItem itemText="Option 1" primaryFocus />
  <OverflowMenuItem itemText="Option 2" />
  ...
</OverflowMenu>
```

There are two important React props:

- `primaryFocus` in `OverflowMenuItem`: This is required for the menu item you
  put keyboard focus on when `OverflowMenu` gets open

Please refer to
[our Storybook](http://react.carbondesignsystem.com/?selectedKind=OverflowMenu&selectedStory=basic)
for more details.

## Note about `<OverflowMenu>` children

Make sure the children of `<OverflowMenu>` are React components that accept
`ref` as their children - Typically `<OverflowMenuItem>`. Otherwise, you'll get
an error like:

```
Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
```
