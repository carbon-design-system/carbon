// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2799-20761&t=gkzO9FaEPqewqYn6-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/PaginationNav/PaginationNav.tsx
// component=PaginationNav

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
  id: 'PaginationNav',
  imports: ["import { PaginationNav } from '@carbon/react';"],
  example: figma.code`<PaginationNav${figma.helpers.react.renderProp(
    'size',
    size
  )} itemsShown={7} totalItems={30}/>`,
};
