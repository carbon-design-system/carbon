// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=43292-32017&t=5C1lVaCoSygb13J1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/DataTable/TableHeader.tsx
// component=TableHeader

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const text = figma.selectedInstance.getString('Cell text');
const isSortable = figma.selectedInstance.getBoolean('Sortable');

export default {
  id: 'TableHeader',
  imports: ["import { TableHeader } from '@carbon/react';"],
  example: figma.code`<TableHeader${figma.helpers.react.renderProp(
    'isSortable',
    isSortable
  )}>${figma.helpers.react.renderChildren(text)}</TableHeader>`,
  metadata: { nestable: true },
};
