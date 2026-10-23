// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=61634-2136&t=RuAO38H8L12JZXpK-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/structured-list/structured-list-header-row.ts
// component=cds-structured-list-header-row

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances(
    (child) => child.name.startsWith('Col') && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'cds-structured-list-header-row',
  imports: [
    "import '@carbon/web-components/es/components/structured-list/structured-list-header-row.js'",
    "import '@carbon/web-components/es/components/structured-list/structured-list-header-cell.js'",
  ],
  example: figma.code`<cds-structured-list-header-row>
  ${children}
</cds-structured-list-header-row>`,
  metadata: { nestable: true },
};
