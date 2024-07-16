/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { TextArea, TextAreaSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  TextArea,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14494-263111&t=4Ath5JqwaYJZxznq-4',
  {
    props: {
      labelText: figma.string('Label text'),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      value: figma.boolean('Text filled', {
        true: figma.string('Body text'),
      }),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      enableCounter: figma.boolean('Show count'),
      placeholder: figma.string('Placeholder text'),
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
    example: ({ ...props }) => <TextAreaDefault {...props} />,
  }
);

figma.connect(
  TextAreaSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=14494-263111&t=4Ath5JqwaYJZxznq-4',
  {
    variant: { State: 'Skeleton' },
    props: {
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
    },
    example: ({ hideLabel }) => <TextAreaSkeleton hideLabel={hideLabel} />,
  }
);
