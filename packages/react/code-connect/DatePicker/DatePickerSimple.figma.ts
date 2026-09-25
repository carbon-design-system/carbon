// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-266985&t=hgJuU7m9Y6EM076g-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/DatePicker/DatePicker.tsx
// component=DatePicker

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const isSkeleton = instance.getEnum('State', {
  Skeleton: true,
});
const hideLabel = instance.getBoolean('Show label', {
  true: false,
  false: true,
});

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'DatePickerSkeleton',
      imports: ["import { DatePickerSkeleton } from '@carbon/react';"],
      example: figma.code`<DatePickerSkeleton${figma.helpers.react.renderProp(
        'hideLabel',
        hideLabel
      )} />`,
      metadata: { nestable: true },
    };
  }

  const placeholder = instance.getString('Date unselected');
  const labelText = instance.getString('Label text');
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = instance.getString('Warning text');
  const helperText = instance.getBoolean('Show helper', {
    true: instance.getString('Helper text'),
  });
  const invalidText = instance.getString('Error text');
  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });

  return {
    id: 'DatePicker',
    imports: ["import { DatePicker, DatePickerInput } from '@carbon/react';"],
    example: figma.code`<DatePicker datePickerType="simple">
  <DatePickerInput${figma.helpers.react.renderProp(
    'placeholder',
    placeholder
  )}${figma.helpers.react.renderProp(
    'labelText',
    labelText
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp(
    'invalid',
    invalid
  )}${figma.helpers.react.renderProp(
    'warn',
    warn
  )}${figma.helpers.react.renderProp(
    'warnText',
    warnText
  )}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}${figma.helpers.react.renderProp(
    'invalidText',
    invalidText
  )}${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'readOnly',
    readOnly
  )}${figma.helpers.react.renderProp(
    'hideLabel',
    hideLabel
  )} id="date-picker-simple" />
</DatePicker>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
