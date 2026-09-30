// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4487-180741&t=T1B0YRZ6hK2IkVMC-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/DataTable/TableToolbar.tsx
// component=TableToolbar

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

export default {
  id: 'TableToolbar',
  imports: [
    "import { TableToolbar, TableToolbarContent, TableToolbarSearch, TableToolbarMenu, TableToolbarAction, Button } from '@carbon/react';",
  ],
  example: figma.code`<TableToolbar>
        <TableToolbarContent>
          <TableToolbarSearch />
          <TableToolbarMenu>
            <TableToolbarAction onClick={() => {}}>
              Action 1
            </TableToolbarAction>
            <TableToolbarAction onClick={() => {}}>
              Action 2
            </TableToolbarAction>
            <TableToolbarAction onClick={() => {}}>
              Action 3
            </TableToolbarAction>
          </TableToolbarMenu>
          <Button onClick={() => {}}>Primary Button</Button>
        </TableToolbarContent>
      </TableToolbar>`,
};
