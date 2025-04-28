/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { PasswordInput, TextInputSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  PasswordInput,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5621-280380&t=BNxiN6zuoeazJ8tv-4',
  {
    props: {
      labelText: figma.string('Label text'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
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
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      // missing from Figma
      // readOnly: figma.enum('State', {
      //   'Read-only': true,
      // }),
    },
    example: ({ ...props }) => <PasswordInput {...props} />,
  }
);

figma.connect(
  TextInputSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=5621-280380&t=BNxiN6zuoeazJ8tv-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <TextInputSkeleton />,
  }
);
