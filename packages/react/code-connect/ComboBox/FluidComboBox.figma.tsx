/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  unstable__FluidComboBox as FluidComboBox,
  unstable__FluidDropdownSkeleto as FluidDropdownSkeleton,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  FluidComboBox,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14505-304219&t=5acDGCinwyrs5Bbc-4',
  {
    props: {
      titleText: figma.boolean('Show tooltip', {
        // true: figma.string('Label text') + figma.children('Tooltip'), //https://github.com/figma/code-connect/issues/92
        true: figma.string('Label text'),
        false: figma.string('Label text'),
      }),
      label: figma.string('Filter text'),
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
      readOnly: figma.enum('State', {
        'Read-only': true,
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
        <FluidComboBox
          onChange={() => {}}
          id="carbon-combobox"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          {...props}
        />
      );
    },
  }
);

figma.connect(
  FluidDropdownSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14505-304219&t=5acDGCinwyrs5Bbc-4',
  {
    variant: { State: 'Skeleton' },
    example: () => {
      return <FluidDropdownSkeleton />;
    },
  }
);
