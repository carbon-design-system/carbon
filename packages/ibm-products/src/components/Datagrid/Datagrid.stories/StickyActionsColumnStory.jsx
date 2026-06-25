/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// import React, { useState, useEffect } from 'react';
// import { Datagrid, useActionsColumn, useDatagrid, useStickyColumn } from '..';
// import { defaultHeader, makeData, Wrapper } from './common';

// StickyActionsColumn.story = {
//   parameters: {
//     notes: `
//     Sticky column and actions column can be used at the same time like the demo above. Following is the doc for each of them.

//     # Sticky column
//     This will make the column mark with \`sticky: "right"\` to be sticky on the right.

//     ## Incompatible with following plugins:
//     - \`useInfiniteScroll\`

//     ## Sample usage:

//     1. include the \`useStickyColumn\` hook
//     2. add \`sticky="right"\` to the column object

//     \`\`\`js
//     const columns = [
//       ... // other columns
//       {
//         Header: "",
//         accessor: "actions",
//         sticky: "right",
//         width: 60,
//       },
//     ]
//     const datagridState = useDatagrid(
//       {
//         columns,
//         data,
//       },
//       useStickyColumn
//     );
//     \`\`\`
//     \`\`\`html
//     <Datagrid {...datagridState} />
//     \`\`\`

//     # Actions column
//     This will add OverflowMenu component to the cells on the column mark with \`isAction: true\`. Each action button callback will include the actionId and row object

//     ## Sample usage:
//     1. include \`useActionsColumn\` hook
//     2. add \`isAction = true\` to the column object in which you wish to add the overflow menu actions
//     3. add \`rowActions = []\` array to the props
//       - \`rowActions[].id\` for callback to identify the action is called
//       - \`rowActions[].onClick(actionId: string, row: Row, event: ClickEvent)\` callback on menuitem clicked. [Row properties](https://react-table.tanstack.com/docs/api/useTable#row-properties)
//       - \`rowActions[].shouldHideMenuItem(row: Row)\` callback to hide this menuitem. [Row properties](https://react-table.tanstack.com/docs/api/useTable#row-properties)
//       - \`rowActions[].shouldDisableMenuItem(row: Row)\` callback to disable this menuitem. [Row properties](https://react-table.tanstack.com/docs/api/useTable#row-properties)
//         - This will override \`rowActions[].disabled\` (from Carbon) because \`shouldDisableMenuItem\` is more specific to the row.
//       - each action object can take all the props from \`OverflowMenuItem\` props, see [carbon docs](https://react.carbondesignsystem.com/?path=/docs/components-overflowmenu--default#overflowmenu)

//     \`\`\`js
//     const columns = [
//       ... // other columns
//       {
//         Header: "",
//         accessor: "actions",
//         isAction: true,
//       },
//     ]
//     const onActionClick = (actionId, row, event) => {};
//     const datagridState = useDatagrid(
//       {
//         columns,
//         data,
//         rowActions: [
//           {
//             id: 'edit',
//             itemText: 'Edit',
//             onClick: onActionClick
//           },
//           {
//             id: 'hidden',
//             itemText: 'Hidden item',
//             onClick: onActionClick,
//             shouldHideMenuItem: () => true,
//           },
//           {
//             id: 'delete',
//             itemText: 'Delete',
//             hasDivider: true,
//             isDelete: true,
//             onClick: onActionClick
//           },
//         ]
//       },
//       useActionsColumn,
//     );
//     \`\`\`
//     \`\`\`html
//     <Datagrid {...datagridState} />
//     \`\`\`
//     `,
//   },
// };

// export default StickyActionsColumn;
