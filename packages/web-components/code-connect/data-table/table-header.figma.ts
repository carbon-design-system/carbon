// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=43292-32017&t=5C1lVaCoSygb13J1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/data-table/table-header-cell.ts
// component=cds-table-header-cell

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderBooleanAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const text = instance.getString('Cell text');
const isSortable = instance.getBoolean('Sortable');

export default {
  id: 'cds-table-header-cell',
  imports: [
    "import '@carbon/web-components/es/components/data-table/index.js'",
  ],
  example: figma.code`<cds-table-header-cell${renderBooleanAttribute(
    'is-sortable',
    isSortable
  )}>${text}</cds-table-header-cell>`,
  metadata: { nestable: true },
};
