// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=17544-268399&t=qp8bdiovIuVIO7xb-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/fluid-time-picker/fluid-time-picker.ts
// component=cds-fluid-time-picker

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

const instance = figma.selectedInstance;

function createTemplate() {
  const disabled = instance.getEnum('State', {
    Disabled: true,
  });
  const readonly = instance.getEnum('State', {
    'Read-only': true,
  });
  const invalid = instance.getEnum('State', {
    Error: true,
  });
  const invalidText = invalid ? instance.getString('Error message') : undefined;
  const warning = instance.getEnum('State', {
    Warning: true,
  });
  const warningText = warning
    ? instance.getString('Warning message')
    : undefined;
  const hasTimezone = instance.getEnum('Inputs', {
    '3': true,
  });

  const timezoneSelect = hasTimezone
    ? figma.code`
  <cds-fluid-time-picker-select id="select-2" default-value="et">
    <cds-select-item value="et">Eastern Time (ET)</cds-select-item>
    <cds-select-item value="ct">Central Time (CT)</cds-select-item>
    <cds-select-item value="mt">Mountain Time (MT)</cds-select-item>
    <cds-select-item value="pt">Pacific Time (PT)</cds-select-item>
  </cds-fluid-time-picker-select>`
    : '';

  return {
    id: 'cds-fluid-time-picker',
    imports: [
      "import '@carbon/web-components/es/components/fluid-time-picker/fluid-time-picker.js'",
      "import '@carbon/web-components/es/components/fluid-time-picker/fluid-time-picker-select.js'",
      "import '@carbon/web-components/es/components/select/select-item.js'",
    ],
    example: figma.code`<cds-fluid-time-picker id="time-picker-1" label-text="Time" placeholder="hh:mm"${renderBooleanAttribute(
      'disabled',
      disabled
    )}${renderBooleanAttribute('readonly', readonly)}${renderBooleanAttribute(
      'invalid',
      invalid
    )}${renderStringAttribute(
      'invalid-text',
      invalidText
    )}${renderBooleanAttribute('warning', warning)}${renderStringAttribute(
      'warning-text',
      warningText
    )}>
  <cds-fluid-time-picker-select id="select-1" default-value="am">
    <cds-select-item value="am">AM</cds-select-item>
    <cds-select-item value="pm">PM</cds-select-item>
  </cds-fluid-time-picker-select>${timezoneSelect}
</cds-fluid-time-picker>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
