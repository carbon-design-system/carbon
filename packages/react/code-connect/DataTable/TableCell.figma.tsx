/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { TableCell } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  TableCell,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=6172-291044&t=5C1lVaCoSygb13J1-4',
  {
    props: {
      children: figma.instance('Swap slot', {
        true: figma.boolean('Slot'),
      }),
      text: figma.boolean('Show text', {
        true: figma.string('Cell text'),
      }),
    },
    example: ({ children, text }) => (
      <TableCell>
        {text}
        {children}
      </TableCell>
    ),
  }
);
