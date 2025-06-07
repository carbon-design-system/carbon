/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { OverflowMenu } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  OverflowMenu,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3717-45725&t=aG4cJRjteQHcd71k-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      direction: figma.enum('Position', {
        Top: 'top',
      }),
      flipped: figma.enum('Alignment', {
        End: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      open: figma.boolean('Open'),

      button: figma.nestedProps('Button', {
        renderIcon: figma.instance('Swap icon'),
      }),
    },
    example: ({ button, ...props }) => (
      <OverflowMenu {...props} renderIcon={button.renderIcon}>
        {/* Sample OverflowMenuItem code, not directly mapped */}
        <OverflowMenuItem itemText="Stop app" />
        <OverflowMenuItem itemText="Restart app" />
        <OverflowMenuItem itemText="Rename app" />
        <OverflowMenuItem itemText="Clone and move app" disabled requireTitle />
        <OverflowMenuItem itemText="Edit routes and access" requireTitle />
        <OverflowMenuItem hasDivider isDelete itemText="Delete app" />
      </OverflowMenu>
    ),
  }
);
