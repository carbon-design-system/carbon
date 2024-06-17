/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

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

      //missing props (available on Tabs items in figma)
      // dismissable
      // iconSize
    },
    example: ({ children, contained, fullWidth }) => (
      // Disclaimer: Code Connect is currently in beta and integration with Carbon
      // React is in an exploratory phase. Code sample below may be incomplete.
      <Tabs>
        <TabList
          aria-label="List of tabs"
          contained={contained}
          fullWidth={fullWidth}>
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
