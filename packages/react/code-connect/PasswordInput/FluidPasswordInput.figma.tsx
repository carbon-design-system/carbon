/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  unstable__FluidPasswordInput as FluidPasswordInput,
  unstable__FluidTextInputSkeleton as FluidTextInputSkeleton,
} from '@carbon/react';

figma.connect(
  FluidPasswordInput,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=68771-7312&t=BNxiN6zuoeazJ8tv-4',
  {
    props: {
      labelText: figma.textContent('Label'),
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
      // missing from Figma
      // readOnly: figma.enum('State', {
      //   'Read-only': true,
      // }),
    },
    example: ({ ...props }) => <FluidPasswordInput {...props} />,
  }
);

figma.connect(
  FluidTextInputSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=68771-7312&t=BNxiN6zuoeazJ8tv-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <FluidTextInputSkeleton />,
  }
);
