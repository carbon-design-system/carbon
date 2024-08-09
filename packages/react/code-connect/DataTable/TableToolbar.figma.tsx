/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { TableToolbar } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  TableToolbar,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4487-180741&t=T1B0YRZ6hK2IkVMC-4',
  {
    example: () => (
      <TableToolbar>
        <TableToolbarContent>
          <TableToolbarSearch />
          <TableToolbarMenu>
            <TableToolbarAction onClick={action('Action 1 Click')}>
              Action 1
            </TableToolbarAction>
            <TableToolbarAction onClick={action('Action 2 Click')}>
              Action 2
            </TableToolbarAction>
            <TableToolbarAction onClick={action('Action 3 Click')}>
              Action 3
            </TableToolbarAction>
          </TableToolbarMenu>
          <Button onClick={action('Button click')}>Primary Button</Button>
        </TableToolbarContent>
      </TableToolbar>
    ),
  }
);
