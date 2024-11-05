/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  unstable__FluidTextInput as FluidTextInput,
  unstable__FluidTextInputSkeleton as FluidTextInputSkeleton,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  FluidTextInput,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=15784-271289&t=4Ath5JqwaYJZxznq-4',
  {
    props: {
      labelText: figma.string('Label text'),
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
      placeholder: figma.string('Placeholder text'),
      value: figma.boolean('Text filled', {
        true: figma.string('Input text'),
      }),
      enableCounter: figma.boolean('Show count'), // https://github.com/carbon-design-system/carbon/issues/16938
      readOnly: figma.enum('State', {
        'Read-only': true, // https://github.com/carbon-design-system/carbon/issues/16938
      }),
    },
    example: ({ ...props }) => <FluidTextInput {...props} />,
  }
);

figma.connect(
  FluidTextInputSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=15784-271289&t=4Ath5JqwaYJZxznq-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <FluidTextInputSkeleton />,
  }
);
