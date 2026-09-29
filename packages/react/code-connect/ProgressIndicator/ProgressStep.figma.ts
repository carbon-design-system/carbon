// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3377-31707&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/ProgressIndicator/ProgressIndicator.tsx
// component=ProgressStep

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const complete = instance.getEnum('State', {
  Completed: true,
});
const current = instance.getEnum('State', {
  Current: true,
});
const disabled = instance.getEnum('State', {
  Disabled: true,
});
const invalid = instance.getEnum('State', {
  Error: true,
});
const label = instance.getString('Label text');
const secondaryLabelLayer = instance.getBoolean('Optional label')
  ? instance.findText('Optional label')
  : null;
const secondaryLabel =
  secondaryLabelLayer && secondaryLabelLayer.type !== 'ERROR'
    ? secondaryLabelLayer.textContent
    : undefined;

export default {
  id: 'ProgressStep',
  imports: ["import { ProgressStep } from '@carbon/react';"],
  example: figma.code`<ProgressStep${figma.helpers.react.renderProp(
    'complete',
    complete
  )}${figma.helpers.react.renderProp(
    'current',
    current
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp(
    'invalid',
    invalid
  )}${figma.helpers.react.renderProp(
    'secondaryLabel',
    secondaryLabel
  )}${figma.helpers.react.renderProp('label', label)}/>`,
  metadata: { nestable: true },
};
