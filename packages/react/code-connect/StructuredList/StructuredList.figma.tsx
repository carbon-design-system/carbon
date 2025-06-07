/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  StructuredListWrapper,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11797-285083&t=FNMM9qlCorQ1hEnC-4',
  {
    props: {
      isCondensed: figma.enum('Size', {
        Condensed: true,
      }),
      headerRowItems: figma.children(['_Structured list header row item']),
      isFlush: figma.boolean('Flush'),
      rowItems: figma.children(['_Structured list row item']),
    },
    example: ({ isFlush, headerRowItem, rowItems, isCondensed }) => (
      <StructuredListWrapper isFlush={isFlush} isCondensed={isCondensed}>
        <StructuredListHead>{headerRowItems}</StructuredListHead>
        <StructuredListBody>{rowItems}</StructuredListBody>
      </StructuredListWrapper>
    ),
  }
);



