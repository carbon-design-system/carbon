// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=6172-291044&t=5C1lVaCoSygb13J1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/data-table/table-cell.ts
// component=cds-table-cell

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance.getBoolean('Slot', {
  true: instance.getInstanceSwap('Swap slot')?.executeTemplate().example,
});
const text = instance.getBoolean('Show text', {
  true: instance.getString('Cell text'),
});

export default {
  id: 'cds-table-cell',
  imports: [
    "import '@carbon/web-components/es/components/data-table/index.js'",
  ],
  example: figma.code`<cds-table-cell>${text}${children}</cds-table-cell>`,
  metadata: { nestable: true },
};
