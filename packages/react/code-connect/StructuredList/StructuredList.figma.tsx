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

// selectable
figma.connect(
  StructuredListWrapper,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=61653-7458&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      isCondensed: figma.enum('Size', {
        Condensed: true,
      }),
      headerRowItems: figma.children(['_Structured list header row item']),
      rowItems: figma.children(['_Structured list row item - Selectable']),
    },
    example: ({ headerRowItem, rowItems, isCondensed }) => (
      <StructuredListWrapper selection isCondensed={isCondensed}>
        <StructuredListHead>{headerRowItems}</StructuredListHead>
        <StructuredListBody>{rowItems}</StructuredListBody>
      </StructuredListWrapper>
    ),
  }
);

// ROWS
// header row
figma.connect(
  StructuredListRow,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11809-286209&t=FNMM9qlCorQ1hEnC-4',
  {
    props: {
      children: figma.children('Col*'),
    },
    example: ({ children }) => (
      <StructuredListRow head>{children}</StructuredListRow>
    ),
  }
);

// row
figma.connect(
  StructuredListRow,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=61634-3169&t=FNMM9qlCorQ1hEnC-4',
  {
    props: {
      children: figma.children('Col*'),
    },
    example: ({ children }) => (
      <StructuredListRow>{children}</StructuredListRow>
    ),
  }
);

// selectable header row
figma.connect(
  StructuredListRow,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=61634-2136&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      children: figma.children('Col*'),
    },
    example: ({ children }) => (
      <StructuredListRow head>{children}</StructuredListRow>
    ),
  }
);

// selectable row
figma.connect(
  StructuredListRow,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11803-290100&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      children: figma.children('Col*'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: ({ children, disabled }) => (
      <StructuredListRow disabled={disabled}>{children}</StructuredListRow>
    ),
  }
);

// CELLS
// header cell
figma.connect(
  StructuredListCell,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11871-287656&t=FNMM9qlCorQ1hEnC-4',
  {
    props: {
      children: figma.string('Header text'),
    },
    example: ({ children }) => (
      <StructuredListCell head>{children}</StructuredListCell>
    ),
  }
);

// cell
figma.connect(
  StructuredListCell,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11801-289539&t=RuAO38H8L12JZXpK-4',
  {
    props: {
      children: figma.string('Row text'),
    },
    example: ({ children }) => (
      <StructuredListCell>{children}</StructuredListCell>
    ),
  }
);
