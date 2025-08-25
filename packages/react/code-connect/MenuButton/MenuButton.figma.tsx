/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20071
// @ts-nocheck
import React from 'react';
import { MenuButton } from '@carbon/react';
import figma from '@figma/code-connect';

const sharedMenuButtonProps = {
  size: figma.enum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  }),
  menuAlignment: figma.enum('Position', {
    Bottom: 'bottom',
    Top: 'top',
  }),
  open: figma.boolean('Open'),
  menu: figma.nestedProps('Menu', {
    menuItem: figma.children(['_Menu list item']),
  }),
  button: figma.nestedProps('Button', {
    kind: figma.enum('Style', {
      Primary: 'primary',
      Tertiary: 'tertiary',
      Ghost: 'ghost',
    }),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
  }),
};

figma.connect(
  MenuButton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31420-317548&t=KXgYpEhuz2XzSITV-4',
  {
    props: sharedMenuButtonProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20071
    example: ({ size, children, menuAlignment, button }) => (
      <MenuButton
        size={size}
        menuAlignment={menuAlignment}
        label="Actions"
        kind={button.kind}
        disabled={button.disabled}>
        {/* eslint-disable-next-line react/jsx-no-undef -- https://github.com/carbon-design-system/carbon/issues/20071 */}
        Open Menu button to view <MenuItem /> props and code
      </MenuButton>
    ),
  }
);

figma.connect(
  MenuButton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31420-317548&t=KXgYpEhuz2XzSITV-4',
  {
    variant: { Open: 'True' },
    props: sharedMenuButtonProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20071
    example: ({ size, children, menuAlignment, button, menu }) => (
      <MenuButton
        size={size}
        menuAlignment={menuAlignment}
        label="Actions"
        kind={button.kind}
        disabled={button.disabled}>
        {menu.menuItem}
      </MenuButton>
    ),
  }
);
