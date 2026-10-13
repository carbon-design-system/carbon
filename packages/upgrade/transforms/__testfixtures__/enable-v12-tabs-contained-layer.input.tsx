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
} from '@carbon/react';

export const Contained = () => (
  <Tabs>
    <TabList aria-label="Contained" contained>
      <Tab>One</Tab>
      <Tab>Two</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Plain panel</TabPanel>
      <TabPanel>
        <Layer>
          <TextInput id="a" labelText="A" />
        </Layer>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export const Vertical = () => (
  <TabsVertical>
    <TabListVertical aria-label="Vertical">
      <Tab>One</Tab>
    </TabListVertical>
    <TabPanels>
      <TabPanel>
        <Layer>
          <TextInput id="b" labelText="B" />
        </Layer>
      </TabPanel>
    </TabPanels>
  </TabsVertical>
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
          <Layer>
            <TextInput id="e" labelText="E" />
          </Layer>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </FeatureFlags>
);

export const SharedWrapperWithSkippedTabs = () => (
  <FeatureFlags>
    <Tabs>
      <TabList aria-label="Migrated" contained>
        <Tab>One</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Layer>
            <TextInput id="f" labelText="F" />
          </Layer>
        </TabPanel>
      </TabPanels>
    </Tabs>
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
  <FeatureFlags enableV12TabsContainedLayer={false}>
    <Tabs>
      <TabList aria-label="Wrapped" contained>
        <Tab>One</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Layer>
            <TextInput id="e" labelText="E" />
          </Layer>
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
