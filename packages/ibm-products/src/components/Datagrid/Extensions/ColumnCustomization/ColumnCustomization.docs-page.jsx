/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { StoryDocsPage } from '../../../../global/js/utils/StoryDocsPage';

export const DocsPage = () => (
  <StoryDocsPage
    omitCodedExample
    blocks={[
      {
        title: 'Customizing columns',
        description: `Customizing columns allows user to reorder and hide certain columns of the datagrid. Consuming component can use the provided callback to save/update according to their persistent strategy.
- Include \`useCustomizeColumns\` and \`useColumnOrder\` hooks (required)
  - \`useColumnOrder\` comes from \`react-table\` but is exported by \`@carbon/ibm-products\` to be used alongside \`useCustomizeColumns\`.
- Implement \`options.DatagridActions\` component
  - this component will have props: \`datagridState\`
  - render \`datagridState.CustomizeColumnsButton\` component wherever makes sense.
- Options available to set:
  - \`options.initialState.hiddenColumns: Array<ColumnId: String>\`
    - Array of column ids that will be hidden after initial render
    - [react-table doc](https://react-table.tanstack.com/docs/api/useTable#table-options)
  - \`options.initialState.columnOrder: Array<ColumnId: String>\`
    - Order of the columns. Any column ids not in this array will be ordered by their position in the \`options.columns\`
    - [react-table doc](https://react-table.tanstack.com/docs/api/useColumnOrder#table-options)
  - \`options.customizeColumnsProps.onSaveColumnPrefs\`
    - type: \`Function(Columns: Array<{ColumnId: String, isVisible: Boolean}>) => void\`
    - Callback function when 'Save' button clicked on the narrow tearsheet. It allows consumer to preserve the updated column preference. This output can also be used to compute the \`hiddenColumns\` and \`columnOrder\`
        `,
        source: {
          code: `
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
  <Datagrid datagridState={datagridState} />
);
          `,
        },
      },
    ]}
  />
);
