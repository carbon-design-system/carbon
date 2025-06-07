/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import { DatePicker, DatePickerInput, DatePickerSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

//simple
figma.connect(
  DatePicker,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-266985&t=hgJuU7m9Y6EM076g-4',
  {
    props: {
      placeholder: figma.string('Date unselected'),
      labelText: figma.string('Label text'),
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
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      invalidText: figma.string('Error text'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      hideLabel: figma.boolean('Show label', {
        true: false,
        false: true,
      }),
    },
    example: ({ ...props }) => (
      <DatePicker type="simple">
        <DatePickerInput {...props} id="date-picker-simple" />
      </DatePicker>
    ),
  }
);

figma.connect(
  DatePickerSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-266985&t=hgJuU7m9Y6EM076g-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <DatePickerSkeleton />, //missing showLabel
  }
);

// single
figma.connect(
  DatePicker,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267504&t=hgJuU7m9Y6EM076g-4',
  {
    props: {
      placeholder: figma.string('Date unselected'),
      labelText: figma.string('Label text'),
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
      helperText: figma.boolean('Show helper', {
        true: figma.string('Helper text'),
      }),
      invalidText: figma.string('Error text'),
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      // hideLabel: missing from Figma component
    },
    example: (props) => (
      <DatePicker type="single">
        <DatePickerInput {...props} id="date-picker-single" />
      </DatePicker>
    ),
  }
);

figma.connect(
  DatePickerSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-267504&t=hgJuU7m9Y6EM076g-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <DatePickerSkeleton />, //missing showLabel
  }
);

//range
figma.connect(
  DatePicker,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268170&t=hgJuU7m9Y6EM076g-4',
  {
    props: {
      size: figma.enum('Size', {
        Large: 'lg',
        Medium: 'md',
        Small: 'sm',
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      datePickerInput: figma.nestedProps(
        'Date picker - Single calendar - Default',
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
    example: ({ size, readOnly, datePickerInput }) => (
      <DatePicker datePickerType="range" readOnly={readOnly}>
        <DatePickerInput
          id="date-picker-input-id-start"
          placeholder={datePickerInput.placeholder}
          labelText="Start date"
          size={size}
          warn={datePickerInput.warn}
          warnText={datePickerInput.warnText}
          invalid={datePickerInput.invalid}
          invalidText={datePickerInput.invalidText}
          disabled={datePickerInput.disabled}
        />
        <DatePickerInput
          id="date-picker-input-id-finish"
          placeholder={datePickerInput.placeholder}
          labelText="End date"
          size={size}
          warn={datePickerInput.warn}
          warnText={datePickerInput.warnText}
          invalid={datePickerInput.invalid}
          invalidText={datePickerInput.invalidText}
          disabled={datePickerInput.disabled}
        />
      </DatePicker>
    ),
  }
);

figma.connect(
  DatePickerSkeleton,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268170&t=hgJuU7m9Y6EM076g-4',
  {
    variant: { State: 'Skeleton' },
    example: () => <DatePickerSkeleton range />, //missing showLabel
  }
);
