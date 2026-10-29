// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2319-15100&t=wcK3P98b09VsrxXF-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ui-shell/header-panel.ts
// component=cds-header-panel

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);

export default {
  id: 'cds-header-panel',
  imports: ["import '@carbon/web-components/es/components/ui-shell/index.js'"],
  example: figma.code`<cds-header>
  <cds-header-panel aria-label="Header panel" expanded>
    <!-- add custom components here -->
    ${children}
  </cds-header-panel>
</cds-header>`,
  metadata: { nestable: false },
};
