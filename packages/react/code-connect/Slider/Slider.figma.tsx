/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { Slider, SliderSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

//single
figma.connect(
  Slider,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3673-40574&m=dev',
  {
    props: {
      slider: figma.nestedProps('_Slider base', {
        labelText: figma.textContent('Label'),
      }),
      invalidText: figma.string('Error text'),
      warnText: figma.string('Warning text'),
      disabled: figma.enum('Status', {
        Disabled: true,
      }),
      invalid: figma.enum('Status', {
        Error: true,
      }),
      readOnly: figma.enum('Status', {
        'Read-only': true,
      }),
      warn: figma.enum('Status', {
        Warning: true,
      }),
      textInput: figma.nestedProps('Text input - Default', {
        value: figma.string('Input text'),
      }),
    },
    example: ({ slider, textInput, ...props }) => (
      <Slider value={textInput.value} labelText={slider.labelText} {...props} />
    ),
  }
);

//two handle
figma.connect(
  Slider,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=41061-1531&m=dev',
  {
    props: {
      max: figma.string('Max range text'),
      min: figma.string('Min range text'),
      invalidText: figma.string('Error text'),
      warnText: figma.string('Warning text'),
      labelText: figma.string('Label text'),
      hideTextInput: figma.boolean('Inputs', {
        false: true,
        true: false,
      }),
      invalidText: figma.string('Error text'),
      warnText: figma.string('Warning text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      invalid: figma.enum('State', {
        'Hover + Error': true,
        'Active + Error': true,
        'Focused + Error': true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      warn: figma.enum('State', {
        'Hover + Warning': true,
        'Active + Warning': true,
        'Focused + Warning': true,
      }),
    },
    example: ({ ...props }) => <Slider twoHandles {...props} />,
  }
);

//single
figma.connect(
  SliderSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3673-40574&m=dev',
  {
    variant: { Status: 'Skeleton' },
    example: () => <SliderSkeleton />,
  }
);

//two handle
figma.connect(
  SliderSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=41061-1531&m=dev',
  {
    variant: { State: 'Skeleton' },
    example: () => <SliderSkeleton twoHandles />,
  }
);
