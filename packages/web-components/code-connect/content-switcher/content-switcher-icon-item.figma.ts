// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=21988-280553&t=Y6lD1uj5Q0yszbgL-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/content-switcher/content-switcher-item.ts
// component=cds-content-switcher-item

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
const disabled = instance.getEnum('State', { Disabled: true });

export default {
  id: 'cds-content-switcher-item',
  imports: [
    "import '@carbon/web-components/es/components/content-switcher/index.js'",
  ],
  example: figma.code`<cds-content-switcher-item icon value="icon-switch-value"${renderBooleanAttribute(
    'disabled',
    disabled
  )}>
  ${children}
  <span slot="tooltip-content">Content switcher item</span>
</cds-content-switcher-item>`,
  metadata: { nestable: true },
};
