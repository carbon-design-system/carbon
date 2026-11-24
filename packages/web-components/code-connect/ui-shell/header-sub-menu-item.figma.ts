// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2133-9888&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ui-shell/header-menu-item.ts
// component=cds-header-menu-item

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const linkText = instance.getString('Link text');

export default {
  id: 'cds-header-menu-item',
  imports: ["import '@carbon/web-components/es/components/ui-shell/index.js'"],
  example: figma.code`<cds-header-menu-item href="#">${linkText}</cds-header-menu-item>`,
  metadata: { nestable: true },
};
