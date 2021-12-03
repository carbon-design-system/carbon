/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs';
import Button from '../../Button';

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
    <TabList aria-label="List of tabs">
      <Tab>Tab Label 1</Tab>
      <Tab disabled>Tab Label 2</Tab>
      <Tab>Tab Label 3</Tab>
      <Tab>Tab Label 4 with a very long long label</Tab>
      <Tab>Tab Label 5</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        Tab Panel 1 <Button>Example button</Button>
      </TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);

export const IconOnly = () => (
  <Tabs>
    <TabList aria-label="List of tabs">
      <Tab disabled>
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

export const Contained = () => (
  <Tabs>
    <TabList aria-label="List of tabs" contained>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab disabled>Tab Label 3</Tab>
      <Tab>Tab Label 4 with a very long long title</Tab>
      <Tab>Tab Label 5</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>
        Tab Panel 2 <Button>Example button</Button>
      </TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Skeleton = () => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <TabsSkeleton />
    </div>
  );
};
