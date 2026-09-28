// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3889-50204&t=gkzO9FaEPqewqYn6-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/pagination/pagination.ts
// component=cds-pagination

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const size = instance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});

export default {
  id: 'cds-pagination',
  imports: [
    "import '@carbon/web-components/es/components/pagination/index.js'",
  ],
  example: figma.code`<cds-pagination
  backward-text="Previous page"
  forward-text="Next page"
  items-per-page-text="Items per page:"
  page="1"
  page-size="10"
  total-items="103"${renderStringAttribute('size', size)}>
  <cds-select-item value="10">10</cds-select-item>
  <cds-select-item value="20">20</cds-select-item>
  <cds-select-item value="30">30</cds-select-item>
  <cds-select-item value="40">40</cds-select-item>
  <cds-select-item value="50">50</cds-select-item>
</cds-pagination>`,
  metadata: { nestable: true },
};
