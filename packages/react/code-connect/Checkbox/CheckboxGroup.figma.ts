// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=17422-270657&t=Qm7ndWAwgu7d5Uxc-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/CheckboxGroup/CheckboxGroup.tsx
// component=CheckboxGroup

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

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
const readOnly = instance.getEnum('State', {
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
  id: 'CheckboxGroup',
  imports: ["import { CheckboxGroup } from '@carbon/react';"],
  example: figma.code`<CheckboxGroup legendText="Checkbox group label"${figma.helpers.react.renderProp(
    'orientation',
    orientation
  )}${figma.helpers.react.renderProp(
    'helperText',
    helperText
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
  )}${figma.helpers.react.renderProp('warnText', warnText)}>
  ${figma.helpers.react.renderChildren(children)}
</CheckboxGroup>`,
  metadata: { nestable: true },
};
