// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=92123-1663&t=UFUf7yvv8SJyoEK1-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/web-components/src/components/ui-shell/header.ts
// component=cds-header

/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';
import { renderStringAttribute } from '../template-helpers';

const instance = figma.selectedInstance;
const getChildren = (layer: string) =>
  instance
    .findConnectedInstances(
      (child) => child.name === layer && child.hasCodeConnect()
    )
    .map((child) => child.executeTemplate().example);
const name = instance.getString('Site name');
const prefix = instance.getBoolean('Site prefix')
  ? instance.getString('Site prefix text')
  : undefined;
const headerMenuButton = instance.getBoolean('Menu')
  ? getChildren('Menu trigger')
  : [];
const headerMenuItems = instance.getBoolean('Navigation')
  ? getChildren('UI shell - Header menu item')
  : [];
const headerGlobalActions = instance.getBoolean('Actions')
  ? getChildren('UI shell - Header actions')
  : [];

export default {
  id: 'cds-header',
  imports: [
    "import '@carbon/web-components/es/components/ui-shell/index.js'",
    "import '@carbon/web-components/es/components/skip-to-content/index.js'",
  ],
  example: figma.code`<cds-header${renderStringAttribute('aria-label', name)}>
  <cds-skip-to-content></cds-skip-to-content>
  ${headerMenuButton}
  <cds-header-name href="#"${renderStringAttribute(
    'prefix',
    prefix
  )}>${name}</cds-header-name>
  <cds-header-nav menu-bar-label="IBM [Platform]">${headerMenuItems}</cds-header-nav>
  <div class="cds--header__global">${headerGlobalActions}</div>
</cds-header>`,
  metadata: { nestable: false },
};
