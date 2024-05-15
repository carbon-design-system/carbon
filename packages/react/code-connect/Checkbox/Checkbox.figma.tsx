import React from 'react';
import { Checkbox, CheckboxSkeleton } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Checkbox,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=3193-29303&mode=design&t=QVE44xARq96HRr11-4',
  {
    props: {
      // indented: figma.boolean('Indented'), //doesn't exist in code
      // label: figma.boolean('Label'), //label only exists on checkbox group in code

      hideLabel: figma.boolean('Value', {
        true: false,
        false: true,
      }),
      labelText: figma.string('Value text'),
      indeterminate: figma.enum('Selection', {
        Indeterminate: true,
      }),
      checked: figma.enum('Selection', {
        Checked: true,
      }),
      warnText: figma.boolean('Warning text'),
      invalidText: figma.string('Error text'),
      helperText: figma.string('Helper text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      readOnly: figma.enum('State', {
        'Read-only': true,
      }),
      invalid: figma.enum('State', {
        Invalid: true,
      }),
      warn: figma.enum('State', {
        Warning: true,
      }),
    },
    example: ({
      helperText,
      labelText,
      indeterminate,
      checked,
      invalidText,
      warnText,
      disabled,
      readOnly,
      invalid,
      warn,
      hideLabel,
    }) => (
      // Disclaimer: Code Connect is currently in beta and
      // integration with Carbon React is in an exploratory phase.
      // Code sample below may be incomplete.
      <Checkbox
        id="your_checkbox_id"
        labelText={labelText}
        helperText={helperText}
        indeterminate={indeterminate}
        checked={checked}
        warnText={warnText}
        invalidText={invalidText}
        disabled={disabled}
        readOnly={readOnly}
        invalid={invalid}
        warn={warn}
        hideLabel={hideLabel}
      />
    ),
  }
);

figma.connect(
  Checkbox,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=3193-29303&mode=design&t=QVE44xARq96HRr11-4',
  {
    variant: { State: 'Skeleton' },
    example: () => (
      // Disclaimer: Code Connect is currently in beta and
      // integration with Carbon React is in an exploratory phase.
      // Code sample below may be incomplete.
      <CheckboxSkeleton />
    ),
  }
);
