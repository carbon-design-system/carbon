/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @ts-nocheck
import React from 'react';
import { ContainedListItem } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  ContainedListItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=16193-272771&t=cMvnFTYLPEhzhIpj-4',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      action: figma.boolean('Action', {
        true: figma.children('Button'),
      }),
      rowCellItem: figma.nestedProps('_Contained list row cell item', {
        text: figma.textContent('Text field'),
        renderIcon: figma.instance('Swap icon'),
      }),
      // item: figma.boolean('Item 2'),
      // item3: figma.boolean('Item 3'),
    },
    example: ({ rowCellItem, ...props }) => (
      <ContainedListItem renderIcon={rowCellItem.renderIcon} {...props}>
        {rowCellItem.text}
      </ContainedListItem>
    ),
  }
);
