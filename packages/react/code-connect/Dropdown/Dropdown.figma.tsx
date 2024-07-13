/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Dropdown, DropdownSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

// @ts-nocheck
figma.connect(
  Dropdown,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=14032-290635&mode=dev',
  {
    props: {
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      titleText: figma.string('Label'),
      label: figma.string('Prompt text'),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      invalidText: figma.string('Error message'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning message'),
      type: figma.enum('Style', {
        Inline: 'inline',
      }),
    },
    example: ({ ...props }) => {
      const items = [
        {
          id: 'option-0',
          text: 'Option 0',
        },
        {
          id: 'option-1',
          text: 'Option 1',
        },
      ];

      return (
        <Dropdown
          {...props}
          id="id"
          initialSelectedItem={items[0]}
          itemToString={(item) => (item ? item.text : '')}
        />
      );
    },
  }
);

figma.connect(
  DropdownSkeleton,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=14032-290635&mode=dev',
  {
    variant: { State: 'Skeleton' },
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
    },
    example: ({ ...props }) => {
      return <DropdownSkeleton {...props} />;
    },
  }
);
