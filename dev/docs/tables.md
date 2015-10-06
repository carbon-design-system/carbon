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

## Accessibility Notes:
There are two types of tables that are used in HTML. Data tables contain multiple rows and columns and are used to present information to a user in a clean, concise manner. Layout tables are used to lay out the images and text on a page. Layout tables do not contain tabular data and are only used for the visual layout.

When a user encounters a table, they must be able to understand the purpose of the table and navigate the specific data that the table shows. Although it is fairly easy for a sighted user to navigate data tables, someone using assistive technology may have a difficult time navigating a data table and understanding its purpose or contents. The user may be unable to match data with a specific column or row header. Using the appropriate table markup techniques in this checkpoint will make your HTML tables easier for assistive technology users to understand and navigate.

Using layout tables to make your pages more visually appealing may create difficulties for someone using assistive technologies, as they will not be able to immediately discern that the table is used only for layout. This checkpoint will show you how to mark up data tables and layout tables.

To comply with this checkpoint, you must meet all of the following techniques. These techniques are defined in [WCAG 2.0 Level A Success Criterion 1.3.1]http://www.w3.org/TR/UNDERSTANDING-WCAG20/content-structure-separation-programmatic.html. These techniques are consistent with the Section 508 guideline for accessible tables.

    1. Table markup: Use table markup to present tabular information.
    2. Id and headers in tables: Use id and headers attributes to associate data cells with header cells in data tables.

See [Web Checklist: Checkpoint 1.3e: Tables]http://w3-03.ibm.com/able/devtest/webtableheaders.html#tech1