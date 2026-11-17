import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, TextInput, FeatureFlags as Flags } from '@carbon/react';

export const ContainedWithAlias = () => (
  <Flags enableV12TabsContainedLayer><Tabs>
      <TabList aria-label="Contained" contained>
        <Tab>One</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TextInput id="a" labelText="A" />
        </TabPanel>
      </TabPanels>
    </Tabs></Flags>
);

export const ExistingAliasedWrapper = () => (
  <Flags enableV12TabsContainedLayer>
    <Tabs>
      <TabList aria-label="Wrapped" contained>
        <Tab>One</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TextInput id="b" labelText="B" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Flags>
);
