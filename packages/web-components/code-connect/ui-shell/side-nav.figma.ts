// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=6227-297201&t=wcK3P98b09VsrxXF-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ui-shell/side-nav.ts
// component=cds-side-nav

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const expanded = !instance.getBoolean('Compact');
const children = instance
  .findConnectedInstances(
    (child) =>
      child.name === 'UI shell - Left panel menu item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'cds-side-nav',
  imports: ["import '@carbon/web-components/es/components/ui-shell/index.js'"],
  example: figma.code`<cds-side-nav aria-label="Side navigation"${renderBooleanAttribute(
    'expanded',
    expanded
  )}>
  <cds-side-nav-items>
    <cds-side-nav-menu title="Menu">${children}</cds-side-nav-menu>
  </cds-side-nav-items>
</cds-side-nav>`,
  metadata: { nestable: false },
};
