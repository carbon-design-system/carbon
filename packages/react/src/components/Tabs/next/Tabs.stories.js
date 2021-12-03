/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Tabs, { TabList, Tab, TabPanels, TabPanel } from './Tabs';
import TabsSkeleton from './Tabs.Skeleton';
import { Monster20, Corn20, Bat20 } from '@carbon/icons-react';

import { unstable_FeatureFlags as FeatureFlags } from 'carbon-components-react';

export default {
  title: 'Components/Tabs',
  decorators: [
    (Story) => (
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <Story />
      </FeatureFlags>
    ),
  ],
  parameters: {
    component: Tabs,
    subcomponents: {
      Tab,
    },
  },
};

export const Default = () => (
  <Tabs>
    <TabList>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab>Tab Label 3</Tab>
      <Tab>Tab Label 4 with a very long long label</Tab>
      <Tab>Tab Label 5</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);

export const IconOnly = () => (
  <Tabs>
    <TabList>
      <Tab>
        <Monster20 />
      </Tab>
      <Tab>
        <Corn20 />
      </Tab>
      <Tab>
        <Bat20 />
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Skeleton = () => {
  const isLoading = true;

  return (
    <div style={{ maxWidth: '100%' }}>
      {isLoading ? (
        <TabsSkeleton />
      ) : (
        <Tabs>
          <Tab id="tab-1" label="Tab label 1">
            <p>Content for first tab goes here.</p>
          </Tab>
          <Tab id="tab-2" label="Tab label 2">
            <p>Content for second tab goes here.</p>
          </Tab>
          <Tab id="tab-3" label="Tab label 3">
            <p>Content for third tab goes here.</p>
          </Tab>
          <Tab
            id="tab-4"
            label="Tab label 4 shows truncation"
            title="Tab label 4 shows truncation">
            <p>Content for fourth tab goes here.</p>
          </Tab>
          <Tab label={<div>Custom Label</div>}>
            <p>Content for fifth tab goes here.</p>
          </Tab>
        </Tabs>
      )}
    </div>
  );
};

export const Contained = () => (
  <Tabs>
    <TabList contained>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab disabled>Tab Label 3</Tab>
      <Tab>Tab Label 4 with a very long long title</Tab>
      <Tab>Tab Label 5</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);
