### SCSS

The update to tables splits out the `scss` files into multiple partial files
with specific functionality, with a main index file bringing them together.

#### Files

| Name                    | Description                              |
| ----------------------- | ---------------------------------------- |
| `data-table`            | index file, brings in all functionality  |
| `data-table-core`       | Core styles and base modifiers, required |
| `data-table-action`     | Action bar styles                        |
| `data-table-expandable` | Expandable row styles                    |
| `data-table-sort`       | Sortable header styles                   |

#### Modifiers

| Name                                    | Description                                         |
| --------------------------------------- | --------------------------------------------------- |
| `bx--data-table--compact`               | Change table row height to 24                       |
| `bx--data-table--short`                 | Change table row height to 32                       |
| `bx--data-table--tall`                  | Change table row height to 64                       |
| `bx--data-table--zebra`                 | Toggle on zebra striping                            |
| `bx--data-table--static`                | Change default table width from 100% to auto        |
| `bx--data-table--no-border`             | Remove default border on table cells                |
| `bx--data-table--visible-overflow-menu` | Show overflow menu icons by default (without hover) |

### JavaScript

#### Getting component class reference

##### ES2015

```javascript
import { DataTable } from 'carbon-components';
```

##### With pre-build bundle (`carbon-components.min.js`)

```javascript
var DataTable = CarbonComponents.DataTable;
```

#### Instantiating

```javascript
// `#my-data-table` is an element with `[data-data-table]` attribute
DataTable.create(document.getElementById('my-data-table'));
```

#### Public Methods

| Name          | Params | Descriptions                                                                                                      |
| ------------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| `release`     |        | Deletes the instance and removes document event listeners                                                         |
| `refreshRows` |        | When adding in new table rows, reinitialize parent-child relationships. Not required if not using expandable rows |

##### Example - Keeping data table in sync with dynamic change in rows list (For expantable table)

```javascript
// `#my-data-table` is an element with `[data-data-table]` attribute
var dataTableInstance = DataTable.create(
  document.getElementById('my-data-table')
);
dataTableInstance.refreshRows();
```

#### Events

| Key                    | Value                           | Description                         |
| ---------------------- | ------------------------------- | ----------------------------------- |
| `eventBeforeExpand`    | `data-table-beforetoggleexpand` | Row expansion event                 |
| `eventAfterExpand`     | `data-table-aftertoggleexpand`  | Row expansion event                 |
| `eventBeforeSort`      | `data-table-beforetogglesort`   | Sort event                          |
| `eventAfterSort`       | `data-table-aftertogglesort`    | Sort event                          |
| `eventTrigger`         | `[data-event]`                  | Data attribute for clickable events |
| `eventParentContainer` | `[data-parent-row]`             | Data attribute for event container  |

##### Example - Preventing a table expando from being toggled in a certain condition

```javascript
document.addEventListener('data-table-beforetoggleexpand', function(evt) {
  if (!myApplication.shouldToggleExpando(evt.target)) {
    evt.preventDefault();
  }
});
```

##### Example - Sorting table content

```javascript
document.addEventListener('data-table-aftertogglesort', function(evt) {
  // `evt.target` will be `div.bx--data-table-container`
  // `evt.detail.element` will be `button.bx--table-sort` whose sorting is changed,
  // and will have `bx--table-sort--ascending` class or not depending on the sorting state
  evt.target.querySelector(
    'tbody'
  ).innerHTML = myApplication.resortTableContent(
    evt.target,
    evt.detail.element
  );
});
```

#### Options

| Key                        | Value                        | Description                                |
| -------------------------- | ---------------------------- | ------------------------------------------ |
| `selectorInit`             | `[data-table]`               | Required css class to target table element |
| `selectorToolbar`          | `.bx--table--toolbar`        | Toolbar parent selector                    |
| `selectorActions`          | `.bx--batch-actions`         | Action bar parent selector                 |
| `selectorCount`            | `[data-items-selected]`      | Selected count span selector               |
| `selectorActionCancel`     | `.bx--batch-summary__cancel` | Action cancel button selector              |
| `selectorCheckbox`         | `.bx--checkbox`              | Checkbox class selector                    |
| `selectorExpandCells`      | `.bx--table-expand`          | Expand td selector                         |
| `selectorExpandableRows`   | `.bx--expandable-row`        | Expand tr selector                         |
| `selectorParentRows`       | `.bx--parent-row`            | Parent row selector                        |
| `selectorChildRow`         | `[data-child-row]`           | Child row selector                         |
| `selectorTableBody`        | `tbody`                      | Generic tbody selector                     |
| `classExpandableRow`       | `bx--expandable-row`         | Expandable Row parent class                |
| `classExpandableRowHidden` | `bx--expandable-row--hidden` | Initial hidden class                       |
| `classExpandableRowHover`  | `bx--expandable-row--hover`  | Hover styles class                         |
| `classTableSortAscending`  | `bx--table-sort--ascending`  | Ascending sort icon class                  |
| `classTableSortActive`     | `bx--table-sort--active`     | Active sort icon class                     |

### FAQ

**How do I sort the tables** The table component does not sort the table for
you, rather it emits an event and toggles the sort UI. It is up to the user to
re-render the table rows sorted; you can see this in action
[in the React Storybook](http://react.carbondesignsystem.com/?selectedKind=DataTable&selectedStory=with%20sorting&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel).

**How do I use the expandable rows** If you would like to programmatically
expand table rows, you can add the `bx--expandable-row` to the
`selectorParentRows` elements.

**How do I activate the batch actions pane** If you would like to
programmatically activate the batch actions pane, you can add
`bx--batch-actions--active` to the `bx--batch-actions` element.
