// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17422-270657&t=Qm7ndWAwgu7d5Uxc-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/checkbox/checkbox-group.ts
// component=cds-checkbox-group

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
const helperText = instance.getBoolean('Helper message')
  ? instance.getString('Helper text')
  : undefined;
const orientation = instance.getBoolean('Horizontal')
  ? 'horizontal'
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

export default {
  id: 'cds-checkbox-group',
  imports: [
    "import '@carbon/web-components/es/components/checkbox/checkbox-group.js'",
  ],
  example: figma.code`<cds-checkbox-group${renderStringAttribute(
    'orientation',
    orientation
  )}${renderStringAttribute('helper-text', helperText)}${renderBooleanAttribute(
    'readonly',
    readonly
  )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
    'invalid-text',
    invalidText
  )}${renderBooleanAttribute('warn', warn)}${renderStringAttribute(
    'warn-text',
    warnText
  )} legend-text="Checkbox group label">
  ${children}
</cds-checkbox-group>`,
  metadata: { nestable: true },
};
