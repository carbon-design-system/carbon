// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3889-50204&t=gkzO9FaEPqewqYn6-4
// source=https://github.com/maradwan26/carbon/blob/main/packages/react/lib/components/Pagination/Pagination.d.ts
// component=Pagination

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
});

export default {
  id: 'Pagination',
  imports: ["import { Pagination } from '@carbon/react';"],
  example: figma.code`<Pagination${figma.helpers.react.renderProp(
    'size',
    size
  )} backwardText="Previous page"
  forwardText="Next page"
  itemsPerPageText="Items per page:"
  onChange={function noRefCheck() { }}
  page={1}
  pageSize={10}
  pageSizes={[10, 20, 30, 40, 50]}
  totalItems={103}/>`,
  metadata: { nestable: true },
};
