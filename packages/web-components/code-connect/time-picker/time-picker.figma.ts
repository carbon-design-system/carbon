// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=17544-268301&t=qp8bdiovIuVIO7xb-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/time-picker/time-picker.ts
// component=cds-time-picker

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import {
  renderBooleanAttribute,
  renderStringAttribute,
} from '../template-helpers';

// TODO: the Figma component exposes Size, the Label toggle and the State enum
// (Enabled,
// Error, Warning, Disabled, Read-only, Skeleton). label-text, placeholder,
// value and the invalid/warning message text have no Figma properties, so
// they are hardcoded below. Skeleton also has no cds-time-picker-skeleton to map to.

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
const readonly = instance.getEnum('State', {
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
  id: 'cds-time-picker',
  imports: [
    "import '@carbon/web-components/es/components/time-picker/time-picker.js'",
    "import '@carbon/web-components/es/components/time-picker/time-picker-select.js'",
    "import '@carbon/web-components/es/components/select/select-item.js'",
  ],
  example: figma.code`<cds-time-picker label-text="Choose a time" placeholder="hh:mm"${renderBooleanAttribute(
    'hide-label',
    hideLabel
  )}${renderStringAttribute(
    'size',
    size
  )}${renderBooleanAttribute('disabled', disabled)}${renderBooleanAttribute(
    'readonly',
    readonly
  )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
    'invalid-text',
    invalidText
  )}${renderBooleanAttribute('warning', warning)}${renderStringAttribute(
    'warning-text',
    warningText
  )}>
  <cds-time-picker-select default-value="AM" id="time-picker-select-1" aria-label="Select AM/PM"${renderBooleanAttribute(
    'disabled',
    disabled
  )}>
    <cds-select-item value="AM">AM</cds-select-item>
    <cds-select-item value="PM">PM</cds-select-item>
  </cds-time-picker-select>
  <cds-time-picker-select default-value="Time zone 1" id="time-picker-select-2" aria-label="Select timezone"${renderBooleanAttribute(
    'disabled',
    disabled
  )}>
    <cds-select-item value="Time zone 1">Time zone 1</cds-select-item>
    <cds-select-item value="Time zone 2">Time zone 2</cds-select-item>
  </cds-time-picker-select>
</cds-time-picker>`,
  metadata: { nestable: true },
};
