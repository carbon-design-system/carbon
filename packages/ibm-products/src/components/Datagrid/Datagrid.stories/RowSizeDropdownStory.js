/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const notes = `
# Changing row size (height/density)
Allow users to adjust the data density on datagrid.

## Documentation:

- (optional) Define initial row size by \`datagridOptions.rowSize\`.
  - Default value is \`md\`.
  - Supported values are \`xl\`, \`lg\`, \`md\`, \`sm\`, \`xs\` same as size prop on carbon component react \`DataTable\`.
- (optional) Provide list of allowed sizes use \`datagridOptions.rowSizes\`
  - Default list is
    \`\`\`
      [{ value: 'lg'}, { value: 'md'}, {value: 'sm'}, {value: 'xs'}]
    \`\`\`
  - Provide \`labelText\` in each option if not satisfied with the default labels.
- (optional) Use \`RowSizeDropdown\` component to change row size:
  - (required) Implement \`datagridOptions.DatagridActions\` component
    - The component will have props: \`datagridState\`
    - Render \`datagridState.RowSizeDropdown\` component in \`datagridOptions.DatagridActions\`.
      - Pass \`datagridState.rowSizeDropdownProps\` as props
      - No extra logic is needed.
  - (optional) Preserve row size, use \`datagridOptions.onRowSizeChange\`
    - type: \`Function(rowSize: String) => void\`
    - It's a callback function when different row size option is selected on the dropdown.
- (optional) Use other component to change row size:
  - Wire the variable controlled by the component with \`datagridOptions.rowSize = variable\`
- (optional) Render different content in the cell on different \`rowSize\`
  - \`Cell\` renderer of each column will receive \`datagridState\` which will contain \`rowSize\`. Render different content based on this value.

code snippet:

\`\`\`js
const columns = React.useMemo(() => [ ...defaultHeader.slice(0, 3),
  {
    Header: 'Different cell content',
    id: 'rowSizeDemo-cell',
    disableSortBy: true,
    Cell: ({ rowSize }) => rowSize,
  }
], []);
const [data] = useState(makeData(10));
const DatagridActions = (datagridState) => (
  <TableToolbarContent>
    <TableToolbarSearch ... />
    <Button ... />
    <datagridState.RowSizeDropdown {...datagridState.rowSizeDropdownProps} />
  </TableToolbarContent>
)
const datagridState = useDatagrid(
  {
    columns,
    data,
    rowSize: 'xs',
    rowSizes: [
      {
        value: 'lg',
        labelText: 'Super tall row',
      },
      {
        value: 'md',
      },
      {
        value: 'xs',
        labelText: 'Teeny tiny row',
      },
    ],
    onRowSizeChange: (rowSize) => {
      console.log(rowSize);
    },
    DatagridActions,
  },
);

return (
  <Wrapper>
    <IntlProvider locale="en">
      <Datagrid {...datagridState} />
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
