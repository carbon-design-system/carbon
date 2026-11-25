// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2927-28166&t=yFGI7EFVWv0vtqIk-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/radio-button/radio-button-group.ts
// component=cds-radio-button-group

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
const children = instance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);
const legendText = instance.getString('Label text');
const disabled = instance.getEnum('State', {
  Disabled: true,
});
const helperText = instance.getBoolean('Helper message')
  ? instance.getString('Helper text')
  : undefined;
const readonly = instance.getEnum('State', {
  'Read-only': true,
});
const invalid = instance.getEnum('State', {
  Invalid: true,
});
const invalidText = invalid ? instance.getString('Error text') : undefined;
const warn = instance.getEnum('State', {
  Warning: true,
});
const warnText = warn ? instance.getString('Warning text') : undefined;
const orientation = instance.getBoolean('Horizontal', {
  false: 'vertical',
});

export default {
  id: 'cds-radio-button-group',
  imports: [
    "import '@carbon/web-components/es/components/radio-button/radio-button-group.js'",
    "import '@carbon/web-components/es/components/radio-button/radio-button.js'",
  ],
  example: figma.code`<cds-radio-button-group${renderBooleanAttribute(
    'disabled',
    disabled
  )}${renderStringAttribute('helper-text', helperText)}${renderBooleanAttribute(
    'invalid',
    invalid
  )}${renderStringAttribute('invalid-text', invalidText)}${renderStringAttribute(
    'legend-text',
    legendText
  )}${renderStringAttribute('orientation', orientation)}${renderBooleanAttribute(
    'readonly',
    readonly
  )}${renderBooleanAttribute(
    'warn',
    warn
  )}${renderStringAttribute('warn-text', warnText)}>
  ${children}
</cds-radio-button-group>`,
  metadata: { nestable: true },
};
