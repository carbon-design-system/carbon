// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=61634-3169&t=FNMM9qlCorQ1hEnC-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/structured-list/structured-list-row.ts
// component=cds-structured-list-row

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
  id: 'cds-structured-list-row',
  imports: [
    "import '@carbon/web-components/es/components/structured-list/structured-list-row.js'",
    "import '@carbon/web-components/es/components/structured-list/structured-list-cell.js'",
  ],
  example: figma.code`<cds-structured-list-row>
  ${children}
</cds-structured-list-row>`,
  metadata: { nestable: true },
};
