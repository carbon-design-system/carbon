// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3284-27542&t=Y6lD1uj5Q0yszbgL-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/list/list-item.ts
// component=cds-list-item

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const children = figma.selectedInstance.getString('List text');

export default {
  id: 'cds-list-item',
  imports: ["import '@carbon/web-components/es/components/list/list-item.js'"],
  example: figma.code`<cds-list-item>${children}</cds-list-item>`,
  metadata: { nestable: true },
};
