// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=6172-291044&t=5C1lVaCoSygb13J1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/DataTable/TableCell.tsx
// component=TableCell

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const children = figma.selectedInstance.getBoolean('Slot', {
  true: figma.selectedInstance.getInstanceSwap('Swap slot')?.executeTemplate()
    .example,
});
const text = figma.selectedInstance.getBoolean('Show text', {
  true: figma.selectedInstance.getString('Cell text'),
});

export default {
  id: 'TableCell',
  imports: ["import { TableCell } from '@carbon/react';"],
  example: figma.code`<TableCell>
        ${figma.helpers.react.renderChildren(text)}
        ${figma.helpers.react.renderChildren(children)}
      </TableCell>`,
  metadata: { nestable: true },
};
