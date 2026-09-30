// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3925-58667&m=dev
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/progress-indicator/progress-indicator.ts
// component=cds-progress-indicator

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);
const vertical = instance.getEnum('Direction', {
  Vertical: true,
});

export default {
  id: 'cds-progress-indicator',
  imports: [
    "import '@carbon/web-components/es/components/progress-indicator/progress-indicator.js'",
    "import '@carbon/web-components/es/components/progress-indicator/progress-step.js'",
  ],
  example: figma.code`<cds-progress-indicator${renderBooleanAttribute(
    'vertical',
    vertical
  )}>
  ${children}
</cds-progress-indicator>`,
  metadata: { nestable: true },
};
