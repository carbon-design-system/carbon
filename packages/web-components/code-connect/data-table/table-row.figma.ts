// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=4547-163221&t=5C1lVaCoSygb13J1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/data-table/table-row.ts
// component=cds-table-row

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

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
const selectionName = selectable || selectType ? 'row' : undefined;

function createTemplate() {
  if (expandable) {
    return {
      id: 'cds-table-row',
      imports: [
        "import '@carbon/web-components/es/components/data-table/index.js'",
      ],
      example: figma.code`<cds-table-row${renderStringAttribute(
        'selection-name',
        selectionName
      )}>${children}</cds-table-row>
<cds-table-expanded-row>
  Expandable row content
</cds-table-expanded-row>`,
      metadata: { nestable: true },
    };
  }

  return {
    id: 'cds-table-row',
    imports: [
      "import '@carbon/web-components/es/components/data-table/index.js'",
    ],
    example: figma.code`<cds-table-row${renderStringAttribute(
      'selection-name',
      selectionName
    )}>${children}</cds-table-row>`,
    metadata: { nestable: true },
  };
}

export default createTemplate();
