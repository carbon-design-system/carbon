# Tables

Areas you can style:

- individual table cells: `<td class="bx-table__cell"><!-- table item here --></td>`
- horizontal table row: `<tr class="bx-table__row"> <!-- table cells here --> </tr>`
- entire table: `<table class="bx-table"> <!-- table here --> </table>`
- table header `<thead class="bx-table__header"> <!-- table row & header --> </thead>`
- table body `<tbody class="bx-table__body"> <!-- table body here --> </tbody>`
- table footer `<tfoot class="bx-table__footer"> <!-- table footer here --> </tfoot>`

## `<thead>`

Table header `<thead>` is where the labels for your table will go, inside of a `<th>` with a class of `"bx-table__heading"`. Table headers contain headers i.e. `<th class="bx-table__heading">Heading 1</th>`

## `<tbody>`

The body data of your table. Each row is a `<tr>` with class `"bx-table__row"`, within which are table cells `<td>` that have class `"bx-table__cell"`

## `<tfoot>`

Only use a table footer `<tfoot>` for summary information

## Content

Tables typically contain text, but may enclose other elements (i.e. icons and images). Refer to the individual elements and use discretion!

## Example:

<table class="bx-table">
    <thead class="bx-table__header">
      <tr class="bx-table__row--header">
        <th class="bx-table__heading">Heading 1</th>
        <th class="bx-table__heading">Heading 2</th>
      </tr>
    </thead>

    <tbody class="bx-table__body">
      <tr class="bx-table__row">
        <td class="bx-table__cell">Item 1</td>
        <td class="bx-table__cell">Description for item 1</td>
      </tr>
      <tr class="bx-table__row">
        <td class="bx-table__cell">Item 2</td>
        <td class="bx-table__cell">Description for item 2</td>
      </tr>
      <tr class="bx-table__row">
        <td class="bx-table__cell">Item 3</td>
        <td class="bx-table__cell">Description for item 3</td>
      </tr>
      <tr class="bx-table__row">
        <td class="bx-table__cell">Item 4</td>
        <td class="bx-table__cell">Description for item 4</td>
      </tr>
    </tbody>

    <tfoot class="bx-table__footer">
      <tr class="bx-table__row--footer">
        <td class="bx-table__cell--footer">Summary Cell</td>
      </tr>
    </tfoot>
  </table>