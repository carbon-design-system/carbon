// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=1830-2335&t=Qm7ndWAwgu7d5Uxc-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/grid/grid.ts
// component=cds-grid

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

// Screen in Figma
const instance = figma.selectedInstance;
// Breakpoint controls the Screen preview in Figma. At runtime, responsive grid
// behavior comes from CSS and cds-column attributes, not a cds-grid attribute
const children = instance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);

export default {
  id: 'cds-grid',
  imports: ["import '@carbon/web-components/es/components/grid/index.js'"],
  example: figma.code`<cds-grid>
  ${children}
</cds-grid>`,
  metadata: { nestable: true },
};
