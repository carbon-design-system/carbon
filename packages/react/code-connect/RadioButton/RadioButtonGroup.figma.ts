// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2927-28166&t=yFGI7EFVWv0vtqIk-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/RadioButtonGroup/RadioButtonGroup.tsx
// component=RadioButtonGroup

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
const legendText = instance.getString('Label text');
const disabled = instance.getEnum('State', {
  Disabled: true,
});
const helperText = instance.getBoolean('Helper message')
  ? instance.getString('Helper text')
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
const orientation = instance.getBoolean('Horizontal', {
  false: 'vertical',
});

export default {
  id: 'RadioButtonGroup',
  imports: ["import { RadioButtonGroup } from '@carbon/react';"],
  example: figma.code`<RadioButtonGroup${figma.helpers.react.renderProp(
    'legendText',
    legendText
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled
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
  )}${figma.helpers.react.renderProp(
    'warnText',
    warnText
  )}${figma.helpers.react.renderProp('orientation', orientation)}>
  ${figma.helpers.react.renderChildren(children)}
</RadioButtonGroup>`,
  metadata: { nestable: true },
};
