import React from 'react';
import {
  Tabs,
  TabsVertical,
  TabList,
  TabListVertical,
  Tab,
  TabPanels,
  TabPanel,
  Layer,
  TextInput,
  FeatureFlags,
} from '@carbon/react';

export const Contained = () => (
  <FeatureFlags enableV12TabsContainedLayer><Tabs>
      <TabList aria-label="Contained" contained>
        <Tab>One</Tab>
        <Tab>Two</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Plain panel</TabPanel>
        <TabPanel>
          <TextInput id="a" labelText="A" />
        </TabPanel>
      </TabPanels>
    </Tabs></FeatureFlags>
);

export const Vertical = () => (
  <FeatureFlags enableV12TabsContainedLayer><TabsVertical>
      <TabListVertical aria-label="Vertical">
        <Tab>One</Tab>
      </TabListVertical>
      <TabPanels>
        <TabPanel>
          <TextInput id="b" labelText="B" />
        </TabPanel>
      </TabPanels>
    </TabsVertical></FeatureFlags>
);

export const NotContained = () => (
  <Tabs>
    <TabList aria-label="Line">
      <Tab>One</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <Layer>
          <TextInput id="c" labelText="C" />
        </Layer>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export const ExplicitLevel = () => (
  <Tabs>
    <TabList aria-label="Level" contained>
      <Tab>One</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <Layer level={0}>
          <TextInput id="d" labelText="D" />
        </Layer>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export const AlreadyWrapped = () => (
  <FeatureFlags enableV12TabsContainedLayer>
    <Tabs>
      <TabList aria-label="Wrapped" contained>
        <Tab>One</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TextInput id="e" labelText="E" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </FeatureFlags>
);

export const SharedWrapperWithSkippedTabs = () => (
  <FeatureFlags>
    <FeatureFlags enableV12TabsContainedLayer><Tabs>
        <TabList aria-label="Migrated" contained>
          <Tab>One</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TextInput id="f" labelText="F" />
          </TabPanel>
        </TabPanels>
      </Tabs></FeatureFlags>
    <Tabs>
      <TabList aria-label="Skipped" contained>
        <Tab>One</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <h3>Title</h3>
          <Layer>
            <TextInput id="g" labelText="G" />
          </Layer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </FeatureFlags>
);

export const NestedLayerNotDirectChild = () => (
  <Tabs>
    <TabList aria-label="Nested" contained>
      <Tab>One</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <div>
          <Layer>
            <TextInput id="h" labelText="H" />
          </Layer>
        </div>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export const ExplicitlyFalse = () => (
  <FeatureFlags enableV12TabsContainedLayer>
    <Tabs>
      <TabList aria-label="Wrapped" contained>
        <Tab>One</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TextInput id="e" labelText="E" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </FeatureFlags>
);

export const DynamicValue = ({ someDynamicVar }) => (
  <FeatureFlags enableV12TabsContainedLayer={someDynamicVar}>
    <Tabs>
      <TabList aria-label="Wrapped" contained>
        <Tab>One</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Layer>
            <TextInput id="e2" labelText="E2" />
          </Layer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </FeatureFlags>
);
