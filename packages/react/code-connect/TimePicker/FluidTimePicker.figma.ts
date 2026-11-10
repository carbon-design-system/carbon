// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=17544-268399&t=qp8bdiovIuVIO7xb-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/FluidTimePicker/FluidTimePicker.tsx
// component=FluidTimePicker

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;

function createTemplate() {
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readOnly = instance.getEnum('State', {
    'Read-only': true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = invalid ? instance.getString('Error message') : undefined;

  const warn = instance.getEnum('State', {
    Warning: true,
  });
  const warnText = warn ? instance.getString('Warning message') : undefined;
  const hasTimezone = instance.getEnum('Inputs', {
    '3': true,
  });

  const props = figma.code`${figma.helpers.react.renderProp(
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
    'warn',
    warn
  )}${figma.helpers.react.renderProp('warnText', warnText)}`;

  const timezoneSelect = hasTimezone
    ? figma.code`
  <FluidTimePickerSelect id="select-2" labelText="Timezone">
    <SelectItem value="et" text="Eastern Time (ET)" />
    <SelectItem value="ct" text="Central Time (CT)" />
    <SelectItem value="mt" text="Mountain Time (MT)" />
    <SelectItem value="pt" text="Pacific Time (PT)" />
  </FluidTimePickerSelect>`
    : '';

  return {
    id: 'FluidTimePicker',
    imports: [
      "import { FluidTimePicker, FluidTimePickerSelect, SelectItem } from '@carbon/react';",
    ],
    example: figma.code`<FluidTimePicker id="time-picker-1" labelText="Time" placeholder="hh:mm"${props}>
  <FluidTimePickerSelect id="select-1" labelText="Clock">
    <SelectItem value="am" text="AM" />
    <SelectItem value="pm" text="PM" />
  </FluidTimePickerSelect>${timezoneSelect}
</FluidTimePicker>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
