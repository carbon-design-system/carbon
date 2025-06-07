/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  unstable__FluidDropdown as FluidDropdown,
  unstable__FluidDropdownSkeleton as FluidDropdownSkeleton,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  FluidDropdown,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14505-302528&t=4Ath5JqwaYJZxznq-4',
  {
    props: {
      titleText: figma.string('Label text'),
      label: figma.string('Prompt text'),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      invalidText: figma.string('Error text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
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
        <FluidDropdown
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
  FluidDropdownSkeleton,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=14032-290635&mode=dev',
  {
    variant: { State: 'Skeleton' },
    example: () => {
      return <FluidDropdownSkeleton />;
    },
  }
);
