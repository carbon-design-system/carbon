// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17544-268170&t=hgJuU7m9Y6EM076g-4
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

function getDatePickerInputProps(layerName: string) {
  const layer = instance.findInstance(layerName);

  return {
    placeholder:
      layer.type !== 'ERROR' ? layer.getString('Date unselected') : undefined,
    disabled:
      layer.type !== 'ERROR'
        ? layer.getEnum('State', {
            Disabled: true,
          })
        : undefined,
    invalid:
      layer.type !== 'ERROR'
        ? layer.getEnum('State', {
            Error: true,
          })
        : undefined,
    warn:
      layer.type !== 'ERROR'
        ? layer.getEnum('State', {
            Warning: true,
          })
        : undefined,
    warnText:
      layer.type !== 'ERROR' ? layer.getString('Warning text') : undefined,
    invalidText:
      layer.type !== 'ERROR' ? layer.getString('Error text') : undefined,
  };
}

function createTemplate() {
  if (isSkeleton) {
    return {
      id: 'DatePickerSkeleton',
      imports: ["import { DatePickerSkeleton } from '@carbon/react';"],
      example: figma.code`<DatePickerSkeleton range />`,
      metadata: { nestable: true },
    };
  }

  const size = instance.getEnum('Size', {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
  });
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });
  const datePickerInput = getDatePickerInputProps(
    'Date picker - Single calendar - Default'
  );

  return {
    id: 'DatePicker',
    imports: ["import { DatePicker, DatePickerInput } from '@carbon/react';"],
    example: figma.code`<DatePicker datePickerType="range"${figma.helpers.react.renderProp(
      'readOnly',
      readOnly
    )}>
  <DatePickerInput id="date-picker-input-id-start"${figma.helpers.react.renderProp(
    'placeholder',
    datePickerInput.placeholder
  )} labelText="Start date"${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'warn',
    datePickerInput.warn
  )}${figma.helpers.react.renderProp(
    'warnText',
    datePickerInput.warnText
  )}${figma.helpers.react.renderProp(
    'invalid',
    datePickerInput.invalid
  )}${figma.helpers.react.renderProp(
    'invalidText',
    datePickerInput.invalidText
  )}${figma.helpers.react.renderProp('disabled', datePickerInput.disabled)} />
  <DatePickerInput id="date-picker-input-id-finish"${figma.helpers.react.renderProp(
    'placeholder',
    datePickerInput.placeholder
  )} labelText="End date"${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'warn',
    datePickerInput.warn
  )}${figma.helpers.react.renderProp(
    'warnText',
    datePickerInput.warnText
  )}${figma.helpers.react.renderProp(
    'invalid',
    datePickerInput.invalid
  )}${figma.helpers.react.renderProp(
    'invalidText',
    datePickerInput.invalidText
  )}${figma.helpers.react.renderProp('disabled', datePickerInput.disabled)} />
</DatePicker>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
