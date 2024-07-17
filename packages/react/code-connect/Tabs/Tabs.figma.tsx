/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable react/jsx-no-duplicate-props */
// @ts-nocheck
import React from 'react';
import { Tabs, TabList, TabPanels, TabPanel } from '@carbon/react';
import figma from '@figma/code-connect';

figma.connect(
  Tabs,
  'https://www.figma.com/file/YAnB1jKx0yCUL29j6uSLpg/(v11)-All-themes---Carbon-Design-System?type=design&node-id=3890-50605&mode=design&t=ERtuwFdbSumlRYtB-4',
  {
    props: {
      children: figma.children(['_Tabs items']),
      contained: figma.enum('Style', {
        Contained: true,
      }),
      fullWidth: figma.enum('Alignment', {
        'Grid aware': true,
      }),
      tab: figma.nestedProps('_Tabs items', {
        size: figma.enum('Size', {
          Large: 'lg',
        }),
        dismissable: figma.boolean('Dismissible'),
        dismissablePlusIcon: figma.boolean('Dismissible + Icon'),
      }),
    },
    example: ({ children, contained, fullWidth, tab }) => (
      <Tabs dismissable={tab.dismissable} dismissable={tab.dismissablePlusIcon}>
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
