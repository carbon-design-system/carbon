/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const notes = `
  # Customizing columns
  Customizing columns allows user to reorder and hide certain columns of the datagrid. Consuming component can use the provided callback to save/update according to their persistent strategy.

  ## Documentation:

  - (required) Add following plugins to \`useDatagrid\` hook
    - \`useCustomizeColumns\`
    - \`useColumnOrder\`
  - (required) Implement \`options.DatagridActions\` component
    - this component will have props: \`datagridState\`
    - render \`datagridState.CustomizeColumnsButton\` component wherever makes sense.
    - \`CustomizeColumnsButton\` props can be overridden. Available props: [carbon-components-react doc](https://react.carbondesignsystem.com/?path=/docs/components-button--default)
  - (optional) Preserve and apply the user preference
    - \`options.initialState.hiddenColumns: Array<ColumnId: String>\`
      - Array of column ids that will be hidden after initial render
      - [react-table doc](https://react-table.tanstack.com/docs/api/useTable#table-options)
    - \`options.initialState.columnOrder: Array<ColumnId: String>\`
      - Order of the columns. Any column ids not in this array will be ordered by their position in the \`options.columns\`
      - [react-table doc](https://react-table.tanstack.com/docs/api/useColumnOrder#table-options)
    - \`options.customizeColumnsProps.onSaveColumnPrefs\`
      - type: \`Function(Columns: Array<{ColumnId: String, isVisible: Boolean}>) => void\`
      - It's a callback function when 'Save' button clicked on the modal. It allows consumer to preserve the updated column preference. This output can also be used to compute the \`hiddenColumns\` and \`columnOrder\`

  code snippet:

  \`\`\`js
  const columns = React.useMemo(() => defaultHeader, []);
  const [data] = useState(makeData(10));
  const DatagridActions = (datagridState) => (
    <TableToolbarContent>
      <TableToolbarSearch ... />
      <Button ... />
      <datagridState.CustomizeColumnsButton />
    </TableToolbarContent>
  )
  const datagridState = useDatagrid(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: ['age'],
        columnOrder: [],
      },
      customizeColumnsProps: {
        onSaveColumnPrefs: (newColDefs) => {
          console.log(newColDefs);
        },
      },
      DatagridActions,
    },
    useCustomizeColumns,
    useColumnOrder,
  );

  return (
    <Wrapper>
      <IntlProvider locale="en">
        <Datagrid {...datagridState} />
        <div>
          Hidden column ids:
          <pre>{JSON.stringify(datagridState.state.hiddenColumns, null, 2)}</pre>
        </div>
      </IntlProvider>
    </Wrapper>
  );
  \`\`\`
`;

export const story = {
  parameters: {
    notes,
  },
};
