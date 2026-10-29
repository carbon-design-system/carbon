// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=6227-297201&t=wcK3P98b09VsrxXF-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UIShell/SideNav.tsx
// component=SideNav

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const expanded = !instance.getBoolean('Compact');
const children = instance
  .findConnectedInstances(
    (child) =>
      child.name === 'UI shell - Left panel menu item' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'SideNav',
  imports: [
    "import { SideNav, SideNavItems, SideNavMenu } from '@carbon/react';",
  ],
  example: figma.code`<SideNav
  aria-label="Side navigation"
  href="#main-content"${figma.helpers.react.renderProp('expanded', expanded)}>
  <SideNavItems>
    <SideNavMenu title="Menu">
      ${figma.helpers.react.renderChildren(children)}
    </SideNavMenu>
  </SideNavItems>
</SideNav>`,
  metadata: { nestable: false },
};
