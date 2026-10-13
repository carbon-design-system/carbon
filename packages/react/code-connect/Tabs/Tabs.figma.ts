// url=https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/?node-id=3890-50605&t=PaZ3ZnEGQGMgXgBW-4
// source=https://github.com/carbon-design-system/carbon/blob/main/packages/react/src/components/Tabs/Tabs.tsx
// component=Tabs

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
    (child) => child.name === '_Horizontal tabs items' && child.hasCodeConnect()
  )
  .map((child) => child.executeTemplate().example);
const contained = instance.getEnum('Style', {
  Contained: true,
});
const fullWidth = instance.getEnum('Alignment', {
  'Grid aware': true,
});

const tabItem = instance.findInstance('_Horizontal tabs items');
const size =
  tabItem.type !== 'ERROR'
    ? tabItem.getEnum('Size', {
        Large: 'lg',
      })
    : undefined;
const dismissable =
  tabItem.type !== 'ERROR'
    ? tabItem.getBoolean('Dismissible') ||
      tabItem.getBoolean('Dismissible + Icon')
    : undefined;

export default {
  id: 'Tabs',
  imports: [
    "import { Tabs, TabList, TabPanels, TabPanel } from '@carbon/react';",
  ],
  example: figma.code`<Tabs${figma.helpers.react.renderProp(
    'dismissable',
    dismissable
  )}>
  <TabList aria-label="List of tabs"${figma.helpers.react.renderProp(
    'contained',
    contained
  )}${figma.helpers.react.renderProp(
    'fullWidth',
    fullWidth
  )}${figma.helpers.react.renderProp('size', size)}>
    ${figma.helpers.react.renderChildren(children)}
  </TabList>
  {/* Example code below, not mapped in Figma.
  There needs to be one TabPanel per Tab */}
  <TabPanels>
    <TabPanel>Tab Panel 1</TabPanel>
    <TabPanel>Tab Panel 2</TabPanel>
    <TabPanel>Tab Panel 3</TabPanel>
    <TabPanel>Tab Panel 4</TabPanel>
  </TabPanels>
</Tabs>`,
  metadata: { nestable: true },
};
