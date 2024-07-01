/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Dropdown, DropdownSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

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
        // Fixed: 'fixed',
        Inline: 'inline',
      }),
      // selectedtext: figma.string('Selected text'), // what is this used for in Figma?
      // unselectedtext: figma.string('Unselected text'),// what is this used for in Figma?
    },
    example: ({
      titleText,
      helperText,
      size,
      warn,
      warnText,
      hideLabel,
      label,
      readOnly,
      disabled,
      invalid,
      invalidText,
      type,
    }) => {
      // Disclaimer: Code Connect is currently in beta and
      // integration with Carbon React is in an exploratory phase.
      // Code sample below may be incomplete.

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
          id="id"
          size={size}
          type={type}
          titleText={titleText}
          helperText={helperText}
          label={label}
          hideLabel={hideLabel}
          disabled={disabled}
          readOnly={readOnly}
          warn={warn}
          warnText={warnText}
          invalid={invalid}
          invalidText={invalidText}
          items={items}
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
    example: ({ size, hideLabel }) => {
      return <DropdownSkeleton hideLabel={hideLabel} size={size} />;
    },
  }
);
