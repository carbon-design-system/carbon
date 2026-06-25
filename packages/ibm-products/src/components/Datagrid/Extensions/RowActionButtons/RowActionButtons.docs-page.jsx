/**
 * Copyright IBM Corp. 2024
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
        title: 'Actions column',
        description: `This will add row actions (if more than two actions are provided an OverflowMenu component will be used) to the cells on the column marked with \`isAction: true\`. Each action button callback will include the actionId and the row object.
- Include useActionsColumn hook
- Add \`isAction = true\` to the column object in which you which to add the overflow menu actions
- Add \`rowActions = []\` array to the props
  - \`rowActions[].id\` for callback to identify the action is called
  - \`rowActions[].onClick(actionId: string, row: Row, event: ClickEvent)\` callback on menuitem clicked. [Row properties](https://react-table.tanstack.com/docs/api/useTable#row-properties)
  - \`rowActions[].shouldHideMenuItem(row: Row)\` callback to hide this menuitem. [Row properties](https://react-table.tanstack.com/docs/api/useTable#row-properties)
  - \`rowActions[].shouldDisableMenuItem(row: Row)\` callback to disable this menuitem. [Row properties](https://react-table.tanstack.com/docs/api/useTable#row-properties)
    - This will override \`rowActions[].disabled\` (from Carbon) because \`shouldDisableMenuItem\` is more specific to the row.
  - each action object can take all the props from OverflowMenuItem props, see [carbon docs](https://react.carbondesignsystem.com/?path=/docs/components-overflowmenu--default#overflowmenu)
        `,
        source: {
          code: `
const columns = [
  // other columns
  {
    Header: '',
    accessor: 'actions',
    isAction: true,
  },
];
const onActionClick = (actionId, row, event) => {};
const datagridState = useDatagrid(
  {
    columns,
    data,
    rowActions: [
      {
        id: 'edit',
        itemText: 'Edit',
        onClick: onActionClick,
      },
      {
        id: 'hidden',
        itemText: 'Hidden item',
        onClick: onActionClick,
        shouldHideMenuItem: () => true,
      },
      {
        id: 'delete',
        itemText: 'Delete',
        hasDivider: true,
        isDelete: true,
        onClick: onActionClick,
      },
    ],
  },
  useActionsColumn
);

return <Datagrid datagridState={datagridState} />;`,
        },
      },
    ]}
  />
);
