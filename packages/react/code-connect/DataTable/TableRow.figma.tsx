/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  TableRow,
  TableExpandRow,
  TableExpandedRow,
  TableSelectRow,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  TableRow,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    props: {
      // aIspacer62100117: figma.boolean('AI spacer'),
      // zebrastyle266920: figma.boolean('Zebra style'),
      // state: figma.enum('State', {
      //   Enabled: 'enabled',
      // }),
      // selectable: figma.boolean('Selectable'),
      // selecttype: figma.enum('Select type', {
      //   None: 'none',
      //   Checkbox: 'checkbox',
      //   'Radio button': 'radio-button',
      // }),
      // selection: figma.enum('Selection', {
      //   None: 'none',
      //   Unchecked: 'unchecked',
      //   Checked: 'checked',
      //   Unselected: 'unselected',
      //   Selected: 'selected',
      // }),
      children: figma.children('Col*'),
    },
    example: ({ children }) => <TableRow>{children}</TableRow>,
  }
);

figma.connect(
  TableRow,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    variant: { Expandable: 'True' },
    props: {
      children: figma.children('Col*'),
    },
    example: ({ children }) => (
      <>
        <TableExpandRow>{children}</TableExpandRow>
        <TableExpandedRow colSpan="headers + 1">
          Expandable row content
        </TableExpandedRow>
      </>
    ),
  }
);

figma.connect(
  TableRow,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    variant: { Expandable: 'True', Selectable: 'True' },
    props: {
      children: figma.children('Col*'),
    },
    example: ({ children }) => (
      <>
        <TableExpandRow>
          <TableSelectRow />
          {children}
        </TableExpandRow>
        <TableExpandedRow colSpan="headers + 1">
          Expandable row content
        </TableExpandedRow>
      </>
    ),
  }
);

figma.connect(
  TableRow,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    variant: { 'Select type': 'Checkbox' },
    props: {
      children: figma.children('Col*'),
    },
    example: ({ children }) => (
      <TableRow>
        <TableSelectRow />
        {children}
      </TableRow>
    ),
  }
);

figma.connect(
  TableRow,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4',
  {
    variant: { 'Select type': 'Radio button' },
    props: {
      children: figma.children('Col*'),
    },
    example: ({ children }) => (
      <TableRow>
        <TableSelectRow radio />
        {children}
      </TableRow>
    ),
  }
);
