/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { FilterableMultiSelect, DropdownSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  FilterableMultiSelect,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-291673&t=aG4cJRjteQHcd71k-4',
  {
    props: {
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
      label: figma.string('Filter...'),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
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
        <FilterableMultiSelect
          {...props}
          id="id"
          items={items}
          itemToString={(item) => (item ? item.text : '')}
          selectionFeedback="top-after-reopen"
        />
      );
    },
  }
);

figma.connect(
  DropdownSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14032-291673&t=aG4cJRjteQHcd71k-4',
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
