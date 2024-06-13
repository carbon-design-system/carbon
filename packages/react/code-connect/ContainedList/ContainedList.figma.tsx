/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { ContainedList, ContainedListItem } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  ContainedList,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272726&t=cMvnFTYLPEhzhIpj-4',
  {
    props: {
      // label: // set on child component in Figma
      children: figma.children(['_Contained list row item']),
      kind: figma.enum('Type', {
        'On page': 'on-page',
        Disclosed: 'disclosed',
      }),

      search: figma.boolean('Search'), // todo: set up as a variant
    },
    example: ({ children, kind }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <ContainedList label="List title" kind={kind}>
        {children}
      </ContainedList>
    ),
  }
);

figma.connect(
  ContainedListItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272771&t=cMvnFTYLPEhzhIpj-4',
  {
    props: {
      item: figma.boolean('Item 2'),
      item3: figma.boolean('Item 3'),
      action: figma.boolean('Action'),
      size: figma.enum('Size', {
        'Extra large': 'extra-large',
        Large: 'large',
        Medium: 'medium',
        Small: 'small',
      }),
      state: figma.enum('State', {
        Enabled: 'enabled',
        Hover: 'hover',
        Focus: 'focus',
        Active: 'active',
        Disabled: 'disabled',
      }),
    },
    example: () => <ContainedListItem />,
  }
);
