/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Checkbox, CheckboxSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Checkbox,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=3193-29303&mode=design&t=QVE44xARq96HRr11-4',
  {
    props: {
      // indented: figma.boolean('Indented'), //doesn't exist in code
      // label: figma.boolean('Label'), // Label needs to be set on <CheckboxGroup /> or <FormLabel />
      // warnMessage: figma.boolean('Warning message'), // you can have a component in a warn state while hiding warning message in Figma, not supported in code
      // errorMessage: figma.boolean('Error message'), // you can have a component in a error state while hiding error message in Figma, not supported in code

      hideLabel: figma.boolean('Value', {
        true: false,
        false: true,
      }),
      labelText: figma.string('Value text'),
      indeterminate: figma.enum('Selection', {
        Indeterminate: true,
      }),
      checked: figma.enum('Selection', {
        Checked: true,
      }),
      helperText: figma.boolean('Helper message', {
        true: figma.string('Helper text'),
      }),
      invalid: figma.enum('State', {
        Invalid: true,
      }),
      invalidText: figma.string('Error text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
    },
    example: ({ ...props }) => <Checkbox id="your_checkbox_id" {...props} />,
  }
);

figma.connect(
  Checkbox,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=3193-29303&mode=design&t=QVE44xARq96HRr11-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <CheckboxSkeleton />,
  }
);
