/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { TableHeader } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  TableHeader,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=43292-32017&t=5C1lVaCoSygb13J1-4',
  {
    props: {
      text: figma.string('Cell text'),
      isSortable: figma.boolean('Sortable'),
    },
    example: ({ text, isSortable }) => (
      <TableHeader isSortable={isSortable}>{text}</TableHeader>
    ),
  }
);
