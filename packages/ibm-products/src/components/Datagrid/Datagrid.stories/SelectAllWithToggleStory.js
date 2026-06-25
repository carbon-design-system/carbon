/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const notes = `
# Select all toggle
Use this feature will allow user to toggle the select all checkbox behavior between selecting all rows **on current page** vs **across all pages**
<br/>
It's using [react-table API](https://react-table.tanstack.com/docs/api/useRowSelect#instance-properties) to select all rows.

## Terminology
- Pagination
  - **UI side pagination**: all rows are loaded to browser, but only display subset of them.
  - **Server side pagination**: subset of rows are loaded to browser, going to another page requires another network call
- Selection mode
  - **all rows**: selects all rows across pages.
  - **all page rows**: selects all rows on the current page.

## Compatibility with other plugin hooks and options
- It has to be used with \`useSelectRows\` hook.
- Select all toggle will not be enabled if \`options.DatagridPagination\` is not defined (select all is the same without pagination)
- Compatible with \`options.DatagridBatchActions\`
- Obviously it will not work when select-all is hidden by \`options.hideSelectAll\`.
- Not compatible with \`useInfiniteScroll\`. Pull request welcome!

## Sample usage:
- (required) \`useSelectRows\` - enable row selections with select all on header
- (required) \`useSelectAllToggle\` - enable select all toggle.
- (optional) config the label on toggle menu:
  - (optional) \`options.selectAllToggle.labels.allRows\` for label that selects all rows across all pages
  - (optional) \`options.selectAllToggle.labels.allPageRows\` for label that selects all rows on current page
- (optional) \`options.selectAllToggle.onSelectAllRows\`
  - type: \`Function(areAllRowsSelected: Boolean) => void\`
  - callback when \`instance.isAllRowsSelected\` value changes. Check out doc: [instance property](https://react-table.tanstack.com/docs/api/useRowSelect#instance-properties)
    - \`true\`: when selection mode is **all rows** and user selects all via toggle dropdown 'Select all' or toggle 'on' on the select all checkbox.
  - useful when grid is server side paginated (only a subset of rows are loaded in UI)

\`\`\`js
const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(100));
  const datagridState = useDatagrid(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        pageSizes: [5,10,25,50]
      },
      selectAllToggle: {
        labels: {
          allRows: "Select all randomly generated rows",
        },
        onSelectAllRows: (areAllSelected) => console.log('are all selected: ', areAllSelected),
      },
      DatagridPagination,
      DatagridActions,
      DatagridBatchActions,
    },
    useSelectRows,
    useSelectAllToggle,
  );

  return (
    <Wrapper>
      <Datagrid {...datagridState} />
    </Wrapper>
);
\`\`\`

`;

export const story = {
  parameters: {
    notes,
  },
};
