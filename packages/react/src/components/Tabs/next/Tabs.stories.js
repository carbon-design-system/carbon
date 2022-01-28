/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, IconTab } from './Tabs';
import Button from '../../Button';

import TabsSkeleton from './Tabs.Skeleton';
import {
  Monster20,
  Corn20,
  Bat20,
  Monster16,
  Corn16,
  Bat16,
} from '@carbon/icons-react';

import { unstable_FeatureFlags as FeatureFlags } from 'carbon-components-react';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <FeatureFlags flags={{ 'enable-v11-release': true }}>
        <Story />
      </FeatureFlags>
    ),
  ],
  subcomponents: {
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  parameters: {},
};

export const Default = () => (
  <div style={{ width: '400px' }}>
    <Tabs>
      <TabList aria-label="List of tabs">
        <Tab>Tab Label 1</Tab>
        <Tab>Tab Label 2</Tab>
        <Tab disabled>Tab Label 3</Tab>
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
  </div>
);

export const Icon20Only = () => (
  <Tabs>
    <TabList iconSize="lg" aria-label="List of tabs">
      <IconTab label="Monster" disabled>
        <Monster20 aria-label="Monster" />
      </IconTab>
      <IconTab label="Corn">
        <Corn20 aria-label="Corn" />
      </IconTab>
      <IconTab label="Bat">
        <Bat20 aria-label="Bat" />
      </IconTab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
    </TabPanels>
  </Tabs>
);

export const IconOnly = () => (
  <Tabs>
    <TabList iconSize="default" aria-label="List of tabs">
      <IconTab label="Monster" disabled>
        <Monster16 aria-label="Monster" />
      </IconTab>
      <IconTab label="Corn">
        <Corn16 aria-label="Corn" />
      </IconTab>
      <IconTab label="Bat">
        <Bat16 aria-label="Bat" />
      </IconTab>
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
