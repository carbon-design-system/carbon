# `DataTable` component

> A set of table primitives to help teams build simple, flexible, and WAI-ARIA
> compliant Tables in React

## Table of Contents

<!-- To run doctoc, just do `npx doctoc README.md` in this directory! -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
  - [`rows`](#rows)
  - [`headers`](#headers)
  - [`sortRow`](#sortrow)
  - [`filterRows`](#filterrows)
  - [`locale`](#locale)
- [Render Prop Function](#render-prop-function)
  - [Prop Getters](#prop-getters)
  - [Actions](#actions)
  - [State](#state)
  - [Props](#props-1)
- [Use-cases](#use-cases)
  - [Sorting](#sorting)
    - [Programmatic sorting](#programmatic-sorting)
    - [Custom sorting](#custom-sorting)
  - [Expansion](#expansion)
    - [Programmatic expansion](#programmatic-expansion)
  - [Selection](#selection)
    - [Programmatic selection](#programmatic-selection)
  - [Filtering](#filtering)
  - [Batch Actions](#batch-actions)
- [Attribution](#attribution)

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

You can include `DataTable` and its components by doing the following in your
project:

```js
import { DataTable } from 'carbon-components-react';
```

The default export for `DataTable` also includes properties for all the `Table*`
components that you will also want to use in your application. You can access
them by doing either of the following:

```js
import { DataTable } from 'carbon-components-react';
// De-structure `DataTable` directly to get local references
const { Table, TableHead, TableHeader, TableBody, TableCell } = DataTable;

// Or, just use them in your React projects by doing
<DataTable.Table />
<DataTable.TableHead />
<DataTable.TableHeader />
// ...
```

The `DataTable` component itself follows the `render` prop pattern, meaning that
in order to render something to the screen you'll have to provide a `render`
function to the `DataTable` component. In practice, this looks like the
following:

```jsx
import { DataTable } from 'carbon-components-react';
const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

// Inside of your component's `render` method
function App() {
  return (
    <DataTable
      rows={initialRows}
      headers={headers}
      render={({ rows, headers, getHeaderProps }) => (
        <TableContainer title="DataTable">
          <Table>
            <TableHead>
              <TableRow>
                {headers.map(header => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.id}>
                  {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
}
```

In the example above, we can see that the `render` prop is just a function that
has the following arguments:

- `rows` which are the rows to be rendered inside of `TableBody`
- `headers` which are the headers to be rendered inside of `TableHead`
- `getHeaderProps` which is our first `prop` getter. This is used for adding in
  the hooks for `TableHeader` to properly sort your table

For a full list of what is available in this `render` prop, check out the
[Render Prop Function](#render-prop-function) section.

## Props

### `rows`

The `rows` prop is where you provide us with a list of all the rows that you
want to render in the table. The only hard requirement is that this is an array
of objects, and that each object has a unique `id` field available on it. For
example:

```js
const rows = [
  {
    id: 'a',
    field1: 'Field 1a',
  },
  {
    id: 'b',
    field1: 'Field 1b',
  },
  {
    id: 'c',
    field1: 'Field 1c',
  },
];
```

#### Extra Options

You can also pass optional options with each row object

| property     | type    | description              |
| ------------ | ------- | ------------------------ |
| `disabled`   | boolean | will render row disabled |
| `isSelected` | boolean | will render row selected |
| `isExpanded` | boolean | will render row expanded |

```js
const rows = [
  {
    id: 'a',
    field1: 'Field 1a',
    disabled: true,
    isExpanded: true,
  },
  {
    id: 'b',
    field1: 'Field 1b',
    isSelected: true,
  },
];
```

### `headers`

The `headers` prop represents the order in which the headers should appear in
the table. We expect an array of objects to be passed in, where `key` is the
name of the key in a row object, and `header` is the name of the header. For
example:

```js
// Given that we have the following rows with the fields `foo`, `bar`, and `baz`
const rows = [
  {
    id: 'a',
    foo: 'Foo a',
    bar: 'Bar a',
    baz: 'Baz a',
  },
  {
    id: 'b',
    foo: 'Foo b',
    bar: 'Bar b',
    baz: 'Baz b',
  },
  {
    id: 'c',
    foo: 'Foo c',
    bar: 'Bar c',
    baz: 'Baz c',
  },
];

// We would have a headers array like the following
const headers = [
  {
    // `key` is the name of the field on the row object itself for the header
    key: 'foo',
    // `header` will be the name you want rendered in the Table Header
    header: 'Foo',
  },
  {
    key: 'bar',
    header: 'Bar',
  },
  {
    key: 'baz',
    header: 'Baz',
  },
];
```

### `sortRow`

Optional hook to manually control sorting of the rows. You can find more
information about this [here](#custom-sorting).

### `filterRows`

Optional hook to manually control filtering of the rows from the
`TableToolbarSearch` component. The signature for the default implementation of
this looks like the following:

```js
/**
 * Default implemention of how we filter rows internally. The idea behind this
 * implementation is to use the given list of row ids and headers to get the
 * individual cell values for a row. Then, we go through each cell value and see
 * if any of them includes the given inputValue.
 *
 * @param {Array[string]} rowIds array of all the row ids in the table
 * @param {Array[Object]} headers
 * @param {Object} cellsById object containing a map of cell id to cell
 * @param {string} inputValue the current input value in the Table Search
 * @returns {Array[string]} rowIds
 */
const filterRows = ({ rowIds, headers, cellsById, inputValue }) => {
  // ...
};
```

### `locale`

Provide a string for the current locale. Defaults to `en`. This helps our
default comparison methods better sort numeric inputs.

## Render Prop Function

The `render` prop is a function that you give to the `DataTable` component that
takes in a variety of arguments and should ultimately return a valid React
element, or component. This could be as simple or complex as the following
example:

```jsx
// Not very useful, but returns a valid React element
const renderProp = () => <div />;
// Useful and returns a valid React Component
const renderProp = ({ rows, headers, getHeaderProps }) => (
  <TableContainer title="DataTable">
    <Table>
      <TableHead>
        <TableRow>
          {headers.map(header => (
            <TableHeader {...getHeaderProps({ header })}>
              {header.header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            {row.cells.map(cell => (
              <TableCell key={cell.id}>{cell.value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
```

The types of arguments that this function has are as follows:

- [Prop Getters](#prop-getters)
- [Actions](#actions)
- [State](#state)
- [Props](#props)

### Prop Getters

> See
> [the blog post about prop getters](https://blog.kentcdodds.com/how-to-give-rendering-control-to-users-with-prop-getters-549eaef76acf)

These functions are used to apply props to the elements that you render. The
idea behind this is that it can allow you more flexibility when deciding when to
render, and where, while still allowing `DataTable` to help orchestrate state
changes inside of the Table itself.

You are able to call these on specific elements in your `render` prop function
by doing the following:

```jsx
<TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
```

In order to make sure that everything works as intended, it's important that you
pass all of the `props` that you want to place on the component as fields on the
object you give to a prop getter. For example, if you wanted to add an `onClick`
handler to `TableHeader` above, you would do the following:

```js
<TableHeader {...getHeaderProps({ header, onClick: this.handleOnClick })}>
  {header.header}
</TableHeader>
```

| property            | type                    | description                                              |
| ------------------- | ----------------------- | -------------------------------------------------------- |
| `getHeaderProps`    | `({ header }) => props` | returns the props you should apply to a specific header  |
| `getRowProps`       | `({ row }) => props`    | returns the props you should apply to a specific row     |
| `getSelectionProps` | `({ row? }) => props`   | returns the props you should apply to selection elements |

### Actions

These are functions you can call to change the state of the `DataTable`
component.

| property        | type                          | description                                     |
| --------------- | ----------------------------- | ----------------------------------------------- |
| `sortBy`        | `(headerKey: string) => void` | Sort by the given `headerKey` value             |
| `selectAll`     | `() => void`                  | Toggle the selection status of all rows         |
| `selectRow`     | `(rowId: string) => void`     | Select a specific row by the given `rowId`      |
| `expandRow`     | `(rowId: string) => void`     | Expand a specific row by the given `rowId`      |
| `onInputChange` | `(event: Event) => void`      | Handle the input change of a table search field |

### State

These are values that represent the current state of the `DataTable` component.

| property     | type    | description                                     |
| ------------ | ------- | ----------------------------------------------- |
| rows         | `Array` | The array of rows to render for the given table |
| selectedRows | `Array` | the array of currently selected rows            |

### Props

As a convenience, `headers` is passed through to make it easier to render the
headers in your table.

## Use-cases

### Sorting

In order to enable the sort behavior for a given `DataTable`, all you need to do
is apply the `getHeaderProps` prop getter to each individual `TableHeader` that
you want the sort actions hooked up for. In practice, this looks like the
following:

```jsx
<DataTable
  rows={initialRows}
  headers={headers}
  render={({ rows, headers, getHeaderProps }) => (
    <TableContainer title="DataTable with sorting">
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableHeader {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {row.cells.map(cell => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
/>
```

#### Programmatic sorting

In addition to the prop getter specified in the previous section, you can also
change the sort status of the table by using the `sortBy` action made available
in your `render` prop function. This `sortBy` utility takes in the `key` of the
header you want to sort by as an argument. After invoking this method with the
given `key`, the table should be sorted by the header that you've specified.

#### Custom sorting

If the default sorting logic doesn't match your use-case, you can provide a
custom sort method as a `sortRow` prop to `DataTable`.

`sortRow` is a method that takes in the values of two cells, in addition to some
info, and should return -1, 0, or 1 as a result (mirroring the native sort
behavior in JavaScript).

The two cells that are passed in are derived by accessing the value of the sort
header in each row that we're comparing. For example, if we're sorting on the
`Foo` header, with the `foo` key available in each row, then for row `a` and row
`b` we would get the `a.foo` and `b.foo` field values.

As a result, a custom `sortRow` function would take on the following shape:

```js
const customSortRow = (cellA, cellB, { sortDirection, sortStates, locale }) => {
  if (sortDirection === sortStates.DESC) {
    return compare(cellB, cellA, locale);
  }

  return compare(cellA, cellB, locale);
};
```

### Expansion

`DataTable` introduces the following components to help out with doing row
expansion:

- `TableExpandHeader`: generic component that you place in your `TableHead`.
  Acts as a column placeholder
- `TableExpandRow`: generic component used for a row that you want to be
  expandable
- `TableExpandedRow`: generic component used for the expanded part of a row.
  Anything you place in this component will appear when the row is expanded

In practice, the combination of these components looks like the following:

```js
<DataTable
  rows={initialRows}
  headers={headers}
  render={({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
    <TableContainer title="DataTable with expansion">
      <Table {...getTableProps()}>
        <TableHead>
          <TableRow>
            {/* add the expand header before all other headers */}
            <TableExpandHeader />
            {headers.map(header => (
              <TableHeader {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            {/* here we use a React fragment so that both rows are returned in the body */}
            <React.Fragment key={row.id}>
              <TableExpandRow {...getRowProps({ row })}>
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableExpandRow>
              {/* toggle based off of if the row is expanded. If it is, render TableExpandedRow */}
              {row.isExpanded && (
                <TableExpandedRow colSpan={headers.length + 1}>
                  <h1>Expandable row content</h1>
                  <p>Description here</p>
                </TableExpandedRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
/>
```

Some things to note:

- `TableExpandHeader` is placed before all other headers as a placeholder/blank
  column
- `TableExpandRow` is what you use instead of `TableRow` for the content of your
  row. We make sure to add `getRowProps` so that it has the right props
- `row.isExpanded` is the field available on `row` to know if the `row` is
  expanded or not
- `TableExpandedRow` is used as a wrapper for any content you want to appear in
  the expanded row
  - Tip: the `colSpan` attribute on the `TableExpandedRow` should be
    `headers.length + 1` in order to span the whole table
  - `TableExpandedRow` should not have a `TableCell` child

#### Programmatic expansion

You can use the `expandRow` action made available through your `render` prop
function to toggle the expansion state of a given row. This method takes in the
row id as a single argument.

### Selection

Selection in a `DataTable` has two parts:

- `TableSelectAll`: component used in the header of the table to select all rows
- `TableSelectRow`: component used to render the selection checkbox in a
  `TableRow`

In practice, it looks like the following in a `DataTable`:

```jsx
<DataTable
  rows={initialRows}
  headers={headers}
  render={({ rows, headers, getHeaderProps, getSelectionProps }) => (
    <TableContainer title="DataTable">
      <Table>
        <TableHead>
          <TableRow>
            <TableSelectAll {...getSelectionProps()} />
            {headers.map(header => (
              <TableHeader {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableSelectRow {...getSelectionProps({ row })} />
              {row.cells.map(cell => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
```

Some items to note:

- `TableSelectAll` is placed before all other headers. It also uses
  `getSelectionProps` to wire up all the necessary actions
- `TableSelectRow` is placed before all the cells in a row. It also uses
  `getSelectionProps`, but it also passes in the specific `row` in order to get
  selection information about the given row.

You can access all the selected rows through the `selectedRows` property passed
into your `render` prop function.

#### Programmatic selection

You can use either of the following actions from your `render` prop function to
update the selection status of a row:

- `selectAll`: invoking this will toggle the selection of all rows, either by
  making all selected or de-selecting all rows
- `selectRow`: invoking this will toggle the selection of a specific row. Takes
  in a valid row id as an argument

### Filtering

Filtering in a `DataTable` is provided through usage of the `TableToolbar` and
the `TableToolbarSearch` component. Any input entered through
`TableToolbarSearch` will be used when the `filterRows` prop is applied. By
default `filterRows` is provided through our default implementation. However,
you can provide your own method if needed.

In practice, this looks like the following:

```jsx
<DataTable
  rows={initialRows}
  headers={headers}
  render={({ rows, headers, getHeaderProps, onInputChange }) => (
    <TableContainer title="DataTable with toolbar">
      <TableToolbar>
        {/* pass in `onInputChange` change here to make filtering work */}
        <TableToolbarSearch onChange={onInputChange} />
        <TableToolbarContent>
          <TableToolbarAction
            icon={iconDownload}
            iconDescription="Download"
            onClick={action('TableToolbarAction - Download')}
          />
          <TableToolbarAction
            icon={iconEdit}
            iconDescription="Edit"
            onClick={action('TableToolbarAction - Edit')}
          />
          <TableToolbarAction
            icon={iconSettings}
            iconDescription="Settings"
            onClick={action('TableToolbarAction - Settings')}
          />
          <Button onClick={action('Add new row')} small kind="primary">
            Add new
          </Button>
        </TableToolbarContent>
      </TableToolbar>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableHeader {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              {row.cells.map(cell => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
/>
```

All you need to do to make sure filtering is hooked up is provide the
`onInputChange` handler as the `onChange` prop to `TableToolbarSearch` in your
`TableToolbar` component.

### Batch Actions

Batch actions are typically used when you want to the user to select multiple
rows in your table and then allow them to perform a single action on the
selected rows. To orchestrate this behavior, you'll need to include both the
Table components for selection and for batch actions, which include:

- `TableToolbar`
- `TableToolbarAction`
- `TableBatchActions`
- `TableBatchAction`
- `TableSelectAll`
- `TableSelectRow`

In practice, this looks like the following:

```js
<DataTable
  rows={initialRows}
  headers={headers}
  render={({
    rows,
    headers,
    getHeaderProps,
    getSelectionProps,
    getBatchActionProps,
    onInputChange,
    {/* the selected rows are provided as a render prop */
    selectedRows,
  }) => (
    <TableContainer title="DataTable with batch actions">
      <TableToolbar>
        {/* make sure to apply getBatchActionProps so that the bar renders */}
        <TableBatchActions {...getBatchActionProps()}>
          {/* inside of you batch actinos, you can include selectedRows */}
          <TableBatchAction onClick={batchActionClick(selectedRows)}>
            Ghost
          </TableBatchAction>
          <TableBatchAction onClick={batchActionClick(selectedRows)}>
            Ghost
          </TableBatchAction>
          <TableBatchAction onClick={batchActionClick(selectedRows)}>
            Ghost
          </TableBatchAction>
        </TableBatchActions>
        <TableToolbarSearch onChange={onInputChange} />
        <TableToolbarContent>
          <TableToolbarAction
            icon={iconDownload}
            iconDescription="Download"
            onClick={action('TableToolbarAction - Download')}
          />
          <TableToolbarAction
            icon={iconEdit}
            iconDescription="Edit"
            onClick={action('TableToolbarAction - Edit')}
          />
          <TableToolbarAction
            icon={iconSettings}
            iconDescription="Settings"
            onClick={action('TableToolbarAction - Settings')}
          />
          <Button onClick={action('Add new row')} small kind="primary">
            Add new
          </Button>
        </TableToolbarContent>
      </TableToolbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableSelectAll {...getSelectionProps()} />
            {headers.map(header => (
              <TableHeader {...getHeaderProps({ header })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableSelectRow {...getSelectionProps({ row })} />
              {row.cells.map(cell => (
                <TableCell key={cell.id}>{cell.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}
/>
```

The import aspects of this example are:

- That we are including the relevant markup for the Table Toolbar
- We are wiring up the Batch Actions component with `getBatchActionProps`. This
  handles toggling the batch action menu for you
- We are reading the `selectedItems` from the `render` prop function in our
  Batch Action click handlers

## Attribution

This `README.md` file is adapted from the
[Downshift `README.md`](https://github.com/paypal/downshift/blob/master/README.md)
file.
