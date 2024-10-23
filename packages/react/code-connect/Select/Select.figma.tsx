/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @ts-nocheck
import React from 'react';
import { Select, SelectItem, SelectSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Select,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17650-274860&t=LS77peWFGhwOdxIw-4',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      inline: figma.enum('Style', {
        Inline: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      invalid: figma.enum('State', {
        Error: true,
      }),
      invalidText: figma.string('Error text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
      // alternate if we want to only show warnText when warning is true
      // probably don't want to do this as in code the user will need to
      // set all of the warnText/invalidText props regardless
      // warnText: figma.enum('State', { Warning: figma.string('Warning text') }),
      labelText: figma.string('Label text'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      // readonlyInputtext: figma.string('Read-only Input text'), // doesn't exist in code shows
    },
    example: ({ ...props }) => (
      <Select {...props}>
        <SelectItem value="" text="" />
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </Select>
    ),
  }
);

figma.connect(
  SelectSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17650-274860&t=LS77peWFGhwOdxIw-4',
  {
    variant: { State: 'Skeleton' },
    props: {
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
    },
    example: () => <SelectSkeleton hideLabel={hideLabel} />,
  }
);
