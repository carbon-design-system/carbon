/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { RadioButtonGroup } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  RadioButtonGroup,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2927-28166&t=yFGI7EFVWv0vtqIk-4',
  {
    props: {
      children: figma.children(['Radio button']),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      helperText: figma.boolean('Helper message', {
        true: figma.string('Helper text'),
      }),
      warnText: figma.string('Warning text'),
      warn: figma.enum('State', {
        Warning: true,
      }),
      invalidText: figma.string('Error text'),
      invalid: figma.enum('State', {
        Invalid: true,
      }),
      legendText: figma.string('Label text'),
      orientation: figma.boolean('Horizontal', {
        false: 'vertical',
      }),
    },
    example: ({
      children,
      disabled,
      helperText,
      warnText,
      warn,
      invalidText,
      invalid,
      orientation,
      legendText,
    }) => (
      <RadioButtonGroup
        disabled={disabled}
        helperText={helperText}
        warnText={warnText}
        warn={warn}
        invalidText={invalidText}
        invalid={invalid}
        orientation={orientation}
        legendText={legendText}>
        {children}
      </RadioButtonGroup>
    ),
  }
);
