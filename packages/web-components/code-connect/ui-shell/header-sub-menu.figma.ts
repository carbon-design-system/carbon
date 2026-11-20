// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2133-9973&t=A3oys5odsvKkcDFA-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ui-shell/header-menu.ts
// component=cds-header-menu

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances(
    (child) =>
      child.name === 'UI shell - Header sub-menu item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'cds-header-menu',
  imports: ["import '@carbon/web-components/es/components/ui-shell/index.js'"],
  example: figma.code`<cds-header-menu menu-label="Menu" trigger-content="Menu">
  ${children}
</cds-header-menu>`,
  metadata: { nestable: true },
};
