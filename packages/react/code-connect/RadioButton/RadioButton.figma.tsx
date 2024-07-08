/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { RadioButton, RadioButtonSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  RadioButton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2930-23442&t=yFGI7EFVWv0vtqIk-4',
  {
    props: {
      labelText: figma.string('Value text'),
      labelPosition: figma.enum('Position', {
        Right: 'right',
      }),
      hideLabel: figma.boolean('Value', {
        true: false,
        false: true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      defaultChecked: figma.boolean('Selected'),
      // Below props are set on RadioButtonGroup only in code
      //
      // labeltext: figma.string('Label text'),
      // warningtext: figma.string('Warning text'),
      // helpermessage: figma.boolean('Helper message'),
      // warningmessage: figma.boolean('Warning message'),
      // errormessage: figma.boolean('Error message'),
      // helpertext: figma.string('Helper text'),
      // errortext: figma.string('Error text'),
      // label: figma.boolean('Label'),
      // state: figma.enum('State', {
      //   'Read-only': 'read-only',
      //   Invalid: 'invalid',
      //   Warning: 'warning',
      // }),
    },
    example: ({
      labelText,
      labelPosition,
      hideLabel,
      disabled,
      defaultChecked,
    }) => (
      <RadioButton
        labelText={labelText}
        labelPosition={labelPosition}
        hideLabel={hideLabel}
        disabled={disabled}
        defaultChecked={defaultChecked}
      />
    ),
  }
);

figma.connect(
  RadioButtonSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2930-23442&t=yFGI7EFVWv0vtqIk-4',
  {
    variant: { State: 'Skeleton' },
    example: () => {
      <RadioButtonSkeleton />;
    },
  }
);
