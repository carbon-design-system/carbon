// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=75823-2818&t=PaZ3ZnEGQGMgXgBW-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tabs/Tabs.tsx
// component=TabsVertical

/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import figma from 'figma';

const instance = figma.selectedInstance;
const children = instance
  .findConnectedInstances(
    (child) => child.name === '_Vertical tabs items' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);

export default {
  id: 'TabsVertical',
  imports: [
    "import { TabsVertical, TabListVertical, TabPanels, TabPanel } from '@carbon/react';",
  ],
  example: figma.code`<TabsVertical>
  <TabListVertical aria-label="List of tabs">
    ${figma.helpers.react.renderChildren(children)}
  </TabListVertical>
  {/* Example code below, not mapped in Figma.
  There needs to be one TabPanel per Tab */}
  <TabPanels>
    <TabPanel>Tab Panel 1</TabPanel>
    <TabPanel>Tab Panel 2</TabPanel>
    <TabPanel>Tab Panel 3</TabPanel>
    <TabPanel>Tab Panel 4</TabPanel>
  </TabPanels>
</TabsVertical>`,
  metadata: { nestable: true },
};
