# `MultiSelect`

> A Dropdown Menu from which you can select given items by clicking on a
> checkbox. Given the right options/properties items can be already selected
> initially.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

This component comes with any installation of the `carbon-components-react`
package on npm. You can install this package by running the following command in
your terminal with [npm](https://www.npmjs.com/):

```bash
npm i carbon-components carbon-components-react carbon-icons --save
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add carbon-components-react carbon-components carbon-icons
```

## Usage

You can use `MultiSelect` by doing the following in your project:

```js
import { MultiSelect } from 'carbon-components-react';
```

You can then create the `MultiSelect` by the following:

```jsx
<MultiSelect
  useTitleInItem={false}
  label="MultiSelect Label"
  invalid={false}
  invalidText="Invalid Selection"
  onChange={onChange}
  items={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  itemToString={itemToString}
  initialSelectedItems={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  translateWithId={translateWithId}
/>
```

## Use-cases

If the variable array provided to the `items` attribute lacks a `label`
property, the component will not render. Using the label prop to render items
would look like the following:

```jsx
<MultiSelect
  useTitleInItem={false}
  label="MultiSelect Label"
  invalid={false}
  invalidText="Invalid Selection"
  onChange={onChange}
  items={[
    { id: 'item-1', text: 'Item 1', label: 'Item 1' },
    { id: 'item-2', text: 'Item 2', label: 'Item 2' },
  ]}
  itemToString={itemToString}
  initialSelectedItems={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  translateWithId={translateWithId}
/>
```

However, you can have items in your array without a `label` field, as long as
you provide the `itemToString` method that properly maps them.

What does the helper function itemToString do?<br/> The helper function
`itemToString` allows you to render a given item to a string label. By default,
it extracts the `label` field from a given item to serve as the item label in
the list. For instance you can use:

```jsx
<MultiSelect
  useTitleInItem={false}
  label="MultiSelect Label"
  invalid={false}
  invalidText="Invalid Selection"
  onChange={onChange}
  items={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  initialSelectedItems={[
    { id: 'item-1', text: 'Item 1' },
    { id: 'item-2', text: 'Item 2' },
  ]}
  translateWithId={translateWithId}
  itemToString={(item) => (item ? item.text : '')}
/>
```
