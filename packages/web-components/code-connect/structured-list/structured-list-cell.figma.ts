// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=11801-289539&t=RuAO38H8L12JZXpK-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/structured-list/structured-list-cell.ts
// component=cds-structured-list-cell

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance.getString('Row text');

export default {
  id: 'cds-structured-list-cell',
  imports: [
    "import '@carbon/web-components/es/components/structured-list/structured-list-cell.js'",
  ],
  example: figma.code`<cds-structured-list-cell>${children}</cds-structured-list-cell>`,
  metadata: { nestable: true },
};
