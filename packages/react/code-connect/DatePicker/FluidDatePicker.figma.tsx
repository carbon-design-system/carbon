/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  unstable__FluidDatePicker as FluidDatePicker,
  unstable__FluidDatePickerInput as FluidDatePickerInput,
  unstable__FluidDatePickerSkeleton as FluidDatePickerSkeleton,
} from '@carbon/react';
import figma from '@figma/code-connect';

// simple fluid
figma.connect(
  FluidDatePicker,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267399&t=hgJuU7m9Y6EM076g-4',
  {
    props: {
      placeholder: figma.string('Date selected'),
      warnText: figma.string('Warning text'),
      labelText: figma.string('Label text'),
      invalidText: figma.string('Error text'),
      invalid: figma.enum('State', {
        Error: true,
      }),
      warn: figma.enum('State', {
        Warning: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
    },
    example: ({ ...props }) => (
      <FluidDatePicker datePickerType="simple">
        <FluidDatePickerInput id="date-picker-simple" {...props} />
      </FluidDatePicker>
    ),
  }
);

figma.connect(
  FluidDatePickerSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267399&t=hgJuU7m9Y6EM076g-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <DatePickerSkeleton type="simple" />,
  }
);

//single fluid
figma.connect(
  FluidDatePicker,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267989&t=hgJuU7m9Y6EM076g-4',
  {
    props: {
      labelText: figma.boolean('Show tooltip', {
        true: figma.string('Label text'), // + figma.children('Tooltip'), //https://github.com/figma/code-connect/issues/92
        false: figma.string('Label text'),
      }),
      placeholder: figma.string('Date selected'),
      warnText: figma.string('Warning text'),
      invalidText: figma.string('Error text'),
      invalid: figma.enum('State', {
        Error: true,
      }),
      warn: figma.enum('State', {
        Warning: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
    },
    example: ({ ...props }) => (
      <FluidDatePicker datePickerType="single">
        <FluidDatePickerInput id="date-picker-simple" {...props} />
      </FluidDatePicker>
    ),
  }
);

figma.connect(
  FluidDatePickerSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267989&t=hgJuU7m9Y6EM076g-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <DatePickerSkeleton type="single" />,
  }
);

//range fluid
figma.connect(
  FluidDatePicker,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268235&t=hgJuU7m9Y6EM076g-4',
  {
    props: {
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      datePickerInput: figma.nestedProps(
        'Date picker - Single calendar - Fluid',
        {
          placeholder: figma.string('Date unselected'),
          disabled: figma.enum('State', {
            Disabled: true,
          }),
          invalid: figma.enum('State', {
            Error: true,
          }),
          warn: figma.enum('State', {
            Warning: true,
          }),
          warnText: figma.string('Warning text'),
          invalidText: figma.string('Error text'),
        }
      ),
    },
    example: ({ readOnly, datePickerInput }) => (
      <FluidDatePicker datePickerType="range" readOnly={readOnly}>
        <FluidDatePickerInput
          id="date-picker-input-id-start"
          placeholder={datePickerInput.placeholder}
          labelText="Start date"
          warn={datePickerInput.warn}
          warnText={datePickerInput.warnText}
          invalid={datePickerInput.invalid}
          invalidText={datePickerInput.invalidText}
          disabled={datePickerInput.disabled}
        />
        <FluidDatePickerInput
          id="date-picker-input-id-finish"
          placeholder={datePickerInput.placeholder}
          labelText="End date"
          warn={datePickerInput.warn}
          warnText={datePickerInput.warnText}
          invalid={datePickerInput.invalid}
          invalidText={datePickerInput.invalidText}
          disabled={datePickerInput.disabled}
        />
      </FluidDatePicker>
    ),
  }
);

figma.connect(
  FluidDatePickerSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268235&t=hgJuU7m9Y6EM076g-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <DatePickerSkeleton type="range" />,
  }
);
