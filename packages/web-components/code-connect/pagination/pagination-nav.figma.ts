// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=2799-20761&t=gkzO9FaEPqewqYn6-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/pagination-nav/pagination-nav.ts
// component=cds-pagination-nav

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
  id: 'cds-pagination-nav',
  imports: [
    "import '@carbon/web-components/es/components/pagination-nav/pagination-nav.js'",
  ],
  example: figma.code`<cds-pagination-nav${renderStringAttribute(
    'size',
    size
  )} items-shown="7" total-items="30"></cds-pagination-nav>`,
  metadata: { nestable: true },
};
