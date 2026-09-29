// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3906-50587&t=SbIuH3RAJeFPjXmN-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/modal/modal-footer.ts
// component=cds-modal-footer

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const children = figma.selectedInstance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);

export default {
  id: 'cds-modal-footer',
  imports: ["import '@carbon/web-components/es/components/modal/index.js'"],
  example: figma.code`<cds-modal-footer>${children}</cds-modal-footer>`,
  metadata: { nestable: true },
};
