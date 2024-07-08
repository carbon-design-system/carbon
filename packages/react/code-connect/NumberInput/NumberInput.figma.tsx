/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { NumberInput, NumberInputSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  NumberInput,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=19893-290998&m=dev',
  {
    props: {
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
      invalid: figma.enum('State', {
        Warning: true,
      }),
      invalidText: figma.string('Error text'),
      label: figma.string('Label text'),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      warn: figma.enum('State', {
        Warning: true,
      }),
      warnText: figma.string('Warning text'),
      numberInputbase: figma.nestedProps('_Number input base', {
        value: figma.textContent('Text'),
      }),
    },
    example: ({
      disabled,
      helperText,
      hideLabel,
      invalid,
      invalidText,
      label,
      readOnly,
      size,
      warn,
      warnText,
      numberInputbase,
    }) => (
      <NumberInput
        disabled={disabled}
        helperText={helperText}
        hideLabel={hideLabel}
        invalid={invalid}
        invalidText={invalidText}
        label={label}
        readOnly={readOnly}
        size={size}
        warn={warn}
        warnText={warnText}
        value={numberInputbase.value}
      />
    ),
  }
);

figma.connect(
  NumberInputSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=19893-290998&m=dev',
  {
    variant: { State: 'Skeleton' },
    props: {
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
    },
    example: ({ hideLabel }) => <NumberInputSkeleton hideLabel={hideLabel} />,
  }
);
