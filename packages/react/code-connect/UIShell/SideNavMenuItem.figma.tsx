/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { SideNavMenu, SideNavMenuItem } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  SideNavMenuItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2346-16194&t=wcK3P98b09VsrxXF-4',
  {
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.enum('State', {
        Active: true,
      }),
    },
    example: ({ linkText, isActive }) => (
      <SideNavMenuItem isActive={isActive} href="#">
        {linkText}
      </SideNavMenuItem>
    ),
  }
);

figma.connect(
  SideNavMenuItem,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2346-16194&t=wcK3P98b09VsrxXF-4',
  {
    variant: { 'Icon left': 'True' },
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.enum('State', {
        Active: true,
      }),
    },
    example: ({ linkText, isActive }) => (
      <SideNavMenuItem renderIcon={IconName} isActive={isActive} href="#">
        {linkText}
      </SideNavMenuItem>
    ),
  }
);

figma.connect(
  SideNavMenu,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2346-16194&t=wcK3P98b09VsrxXF-4',
  {
    variant: { Type: 'Sub-menu' },
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.enum('State', {
        Active: true,
      }),
    },
    example: ({ linkText, isActive }) => (
      <SideNavMenu title={linkText} isActive={isActive}>
        <SideNavMenuItem href="#">Nested link</SideNavMenuItem>
      </SideNavMenu>
    ),
  }
);

figma.connect(
  SideNavMenu,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2346-16194&t=wcK3P98b09VsrxXF-4',
  {
    variant: { Type: 'Sub-menu', 'Icon left': 'True' },
    props: {
      linkText: figma.string('Link text'),
      isActive: figma.enum('State', {
        Active: true,
      }),
    },
    example: ({ linkText, isActive }) => (
      <SideNavMenu renderIcon={IconName} title={linkText} isActive={isActive}>
        <SideNavMenuItem href="#">Nested link</SideNavMenuItem>
      </SideNavMenu>
    ),
  }
);

// figma.connect(
//   HeaderMenuItem,
//   'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2346-16194&t=wcK3P98b09VsrxXF-4',
//   {
//     variant: { Type: 'Divider' },
//     example: () => <SwitcherDivider />,
//   }
// );
