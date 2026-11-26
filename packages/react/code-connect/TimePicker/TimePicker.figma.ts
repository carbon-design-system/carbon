// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=17544-268301&t=qp8bdiovIuVIO7xb-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/TimePicker/TimePicker.tsx
// component=TimePicker

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

// TODO: the Figma component exposes Size, the Label toggle and the State enum
// (Enabled,
// Error, Warning, Disabled, Read-only, Skeleton). labelText, placeholder,
// value and the invalid/warning message text have no Figma properties, so
// they are hardcoded below. Skeleton also has no TimePickerSkeleton to map to.
// Revisit once the Figma file is updated
const instance = figma.selectedInstance;
const hideLabel = !instance.getBoolean('Label');
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});
const disabled = instance.getEnum('State', {
  Disabled: true,
});
const readOnly = instance.getEnum('State', {
  'Read-only': true,
});
const invalid = instance.getEnum('State', {
  Error: true,
});
const invalidText = invalid ? 'Error message goes here' : undefined;
const warning = instance.getEnum('State', {
  Warning: true,
});
const warningText = warning ? 'Warning message goes here' : undefined;

export default {
  id: 'TimePicker',
  imports: [
    "import { TimePicker, TimePickerSelect, SelectItem } from '@carbon/react';",
  ],
  example: figma.code`<TimePicker labelText="Choose a time" placeholder="hh:mm"${figma.helpers.react.renderProp(
    'hideLabel',
    hideLabel
  )}${figma.helpers.react.renderProp(
    'size',
    size
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp(
    'readOnly',
    readOnly
  )}${figma.helpers.react.renderProp(
    'invalid',
    invalid
  )}${figma.helpers.react.renderProp(
    'invalidText',
    invalidText
  )}${figma.helpers.react.renderProp(
    'warning',
    warning
  )}${figma.helpers.react.renderProp('warningText', warningText)}>
  <TimePickerSelect id="time-picker-select-1">
    <SelectItem value="AM" text="AM" />
    <SelectItem value="PM" text="PM" />
  </TimePickerSelect>
  <TimePickerSelect id="time-picker-select-2">
    <SelectItem value="Time zone 1" text="Time zone 1" />
    <SelectItem value="Time zone 2" text="Time zone 2" />
  </TimePickerSelect>
</TimePicker>`,
  metadata: { nestable: true },
};
