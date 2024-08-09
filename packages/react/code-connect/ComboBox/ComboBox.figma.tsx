/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { ComboBox, DropdownSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  ComboBox,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-290976&t=5acDGCinwyrs5Bbc-4',
  {
    props: {
      placeholder: figma.string('Filter text'),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      titleText: figma.string('Label text'),
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
        <ComboBox
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
  DropdownSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-290976&t=5acDGCinwyrs5Bbc-4',
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
