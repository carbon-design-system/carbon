/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Menu } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Menu,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=31131-96397&t=OdgMrt4NDVwZpNSx-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
        'Extra small': 'xs',
      }),
      children: figma.children(['_Menu list item']),
    },
    example: ({ children, size }) => <Menu size={size}>{children}</Menu>,
  }
);
