// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3377-31707&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/progress-indicator/progress-step.ts
// component=cds-progress-step

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
  id: 'cds-progress-step',
  imports: [
    "import '@carbon/web-components/es/components/progress-indicator/progress-step.js'",
  ],
  example: figma.code`<cds-progress-step${renderBooleanAttribute(
    'complete',
    complete
  )}${renderBooleanAttribute('current', current)}${renderBooleanAttribute(
    'disabled',
    disabled
  )}${renderBooleanAttribute('invalid', invalid)}${renderStringAttribute(
    'label',
    label
  )}${renderStringAttribute(
    'secondary-label',
    secondaryLabel
  )}></cds-progress-step>`,
  metadata: { nestable: true },
};
