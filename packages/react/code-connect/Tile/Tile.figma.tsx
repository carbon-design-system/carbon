/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Tile } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Tile,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=20125-279432&m=dev',
  {
    props: {
      swapslot: figma.instance('Swap slot'),
      descriptiontext: figma.string('Description text'),
      description: figma.boolean('Description'),
      slot: figma.boolean('Slot'),
      title: figma.boolean('Title'),
      titletext: figma.string('Title text'),
      type: figma.enum('Type', {
        Base: 'base',
        Clickable: 'clickable',
        'Single-select': 'single-select',
        'Multi-select': 'multi-select',
        Expandable: 'expandable',
        'Expandable (Interactive)': 'expandable--interactive-',
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      selected: figma.boolean('Selected'),
    },
    example: (props) => <Tile {...props} />,
  }
);
