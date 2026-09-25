// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3897-51336&t=SbIuH3RAJeFPjXmN-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/form/form.ts
// component=cds-form

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
  id: 'cds-form',
  imports: ["import '@carbon/web-components/es/components/form/index.js'"],
  example: figma.code`<cds-form aria-label="sample form">${children}</cds-form>`,
  metadata: { nestable: true },
};
