/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { ComboButton } from '@carbon/react';
import figma from '@figma/code-connect';

const sharedComboButtonProps = {
  size: figma.enum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  }),
  position: figma.enum('Position', {
    Bottom: 'bottom',
    Top: 'top',
  }),
  open: figma.boolean('Open'),
  menu: figma.nestedProps('Menu', {
    menuItem: figma.children(['_Menu list item']),
  }),
};

figma.connect(
  ComboButton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31753-68447&t=aG4cJRjteQHcd71k-4',
  {
    props: sharedComboButtonProps,
    example: ({ size, position }) => (
      <ComboButton size={size} position={position} label="Primary action">
        Open Combo button to view <MenuItem /> props and code
      </ComboButton>
    ),
  }
);

figma.connect(
  ComboButton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31753-68447&t=aG4cJRjteQHcd71k-4',
  {
    variant: { Open: 'True' },
    props: sharedComboButtonProps,
    example: ({ size, position, menu }) => (
      <ComboButton size={size} position={position} label="Primary action">
        {menu.menuItem}
      </ComboButton>
    ),
  }
);
