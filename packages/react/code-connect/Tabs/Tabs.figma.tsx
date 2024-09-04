/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @ts-nocheck
import React from 'react';
import {
  Tabs,
  TabsVertical,
  TabListVertical,
  TabList,
  TabPanels,
  TabPanel,
} from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Tabs,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=3890-50605&t=PaZ3ZnEGQGMgXgBW-4',
  {
    props: {
      contained: figma.enum('Style', {
        Contained: true,
      }),
      fullWidth: figma.enum('Alignment', {
        'Grid aware': true,
      }),
      children: figma.children(['_Horizontal tabs items']),
      tab: figma.nestedProps('_Horizontal tabs items', {
        size: figma.enum('Size', {
          Large: 'lg',
        }),
        dismissable: figma.boolean('Dismissible', {
          true: true,
          false: figma.boolean('Dismissible + Icon'),
        }),
      }),
    },
    example: ({ children, contained, fullWidth, tab }) => (
      <Tabs dismissable={tab.dismissable}>
        <TabList
          aria-label="List of tabs"
          contained={contained}
          fullWidth={fullWidth}
          size={tab.size}>
          {children}
        </TabList>
        {/* Example code below, not mapped in Figma.
        There needs to be one TabPanel per Tab/IconTab */}
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
          <TabPanel>Tab Panel 4</TabPanel>
        </TabPanels>
      </Tabs>
    ),
  }
);

// vertical
figma.connect(
  TabsVertical,
  'https://www.figma.com/design/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?node-id=75823-2818&t=PaZ3ZnEGQGMgXgBW-4',
  {
    props: {
      children: figma.children(['_Vertical tabs items']),
    },
    example: ({ children }) => (
      <TabsVertical>
        <TabListVertical aria-label="List of tabs">{children}</TabListVertical>
        {/* Example code below, not mapped in Figma.
        There needs to be one TabPanel per Tab */}
        <TabPanels>
          <TabPanel>Tab Panel 1</TabPanel>
          <TabPanel>Tab Panel 2</TabPanel>
          <TabPanel>Tab Panel 3</TabPanel>
          <TabPanel>Tab Panel 4</TabPanel>
        </TabPanels>
      </TabsVertical>
    ),
  }
);
