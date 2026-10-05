// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=75769-1965&t=PaZ3ZnEGQGMgXgBW-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/tabs/tab.ts
// component=cds-tab

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const label = instance.getString('Text');
const disabled = instance.getEnum('State', {
  Disabled: true,
});

export default {
  id: 'cds-tab',
  imports: ["import '@carbon/web-components/es/components/tabs/index.js'"],
  example: figma.code`<cds-tab${renderBooleanAttribute(
    'disabled',
    disabled
  )}>${label}</cds-tab>`,
  metadata: { nestable: true },
};
