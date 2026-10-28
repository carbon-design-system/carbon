// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=2319-15100&t=wcK3P98b09VsrxXF-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/UIShell/HeaderPanel.tsx
// component=HeaderPanel

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances((child) => child.hasCodeConnect())
  .map((child) => child.executeTemplate().example);

export default {
  id: 'HeaderPanel',
  imports: ["import { Header, HeaderPanel } from '@carbon/react';"],
  example: figma.code`<Header aria-label="Header">
  <HeaderPanel aria-label="Header panel" expanded>
    {/* add custom components here */}
    ${figma.helpers.react.renderChildren(children)}
  </HeaderPanel>
</Header>`,
  metadata: { nestable: false },
};
