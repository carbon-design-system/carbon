// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/DataTable/TableRow.tsx
// component=TableRow

/**
 * Copyright IBM Corp. 2016, 2026
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
const expandable = instance.getEnum('Expandable', {
  True: true,
});
const selectable = instance.getEnum('Selectable', {
  True: true,
});
const selectType = instance.getEnum('Select type', {
  Checkbox: 'checkbox',
  'Radio button': 'radio',
});
const columnCount = children.length;

function createTemplate() {
  if (expandable && selectable) {
    return {
      id: 'TableRow',
      imports: [
        "import { TableExpandRow, TableExpandedRow, TableSelectRow } from '@carbon/react';",
      ],
      example: figma.code`<>
  <TableExpandRow aria-label="Expand row" onExpand={() => {}}>
    <TableSelectRow id="select-row" name="select-row" onSelect={() => {}} />
    ${figma.helpers.react.renderChildren(children)}
  </TableExpandRow>
  <TableExpandedRow colSpan={${columnCount + 2}}>
    Expandable row content
  </TableExpandedRow>
</>`,
      metadata: { nestable: true },
    };
  }

  if (expandable) {
    return {
      id: 'TableRow',
      imports: [
        "import { TableExpandRow, TableExpandedRow } from '@carbon/react';",
      ],
      example: figma.code`<>
  <TableExpandRow aria-label="Expand row" onExpand={() => {}}>${figma.helpers.react.renderChildren(
    children
  )}</TableExpandRow>
  <TableExpandedRow colSpan={${columnCount + 1}}>
    Expandable row content
  </TableExpandedRow>
</>`,
      metadata: { nestable: true },
    };
  }

  if (selectType) {
    const radio = selectType === 'radio';

    return {
      id: 'TableRow',
      imports: ["import { TableRow, TableSelectRow } from '@carbon/react';"],
      example: figma.code`<TableRow>
  <TableSelectRow id="select-row" name="select-row" onSelect={() => {}}${figma.helpers.react.renderProp(
    'radio',
    radio
  )} />
  ${figma.helpers.react.renderChildren(children)}
</TableRow>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'TableRow',
    imports: ["import { TableRow } from '@carbon/react';"],
    example: figma.code`<TableRow>${figma.helpers.react.renderChildren(
      children
    )}</TableRow>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
