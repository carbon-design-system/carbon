import React from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Layer,
  TextInput,
  FeatureFlags as Flags,
} from '@carbon/react';

export const ContainedWithAlias = () => (
  <Tabs>
    <TabList aria-label="Contained" contained>
      <Tab>One</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <Layer>
          <TextInput id="a" labelText="A" />
        </Layer>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export const ExistingAliasedWrapper = () => (
  <Flags>
    <Tabs>
      <TabList aria-label="Wrapped" contained>
        <Tab>One</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Layer>
            <TextInput id="b" labelText="B" />
          </Layer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Flags>
);
