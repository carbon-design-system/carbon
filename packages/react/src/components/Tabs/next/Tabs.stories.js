/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, IconTab } from './Tabs';
import TextInput from '../../TextInput';
import Checkbox from '../../Checkbox';
import Button from '../../Button';
import mdx from './Tabs.mdx';

import TabsSkeleton from './Tabs.Skeleton';
import { Monster, Corn, Bat } from '@carbon/icons-react';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: {
    TabList,
    Tab,
    TabPanels,
    TabPanel,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => (
  <Tabs>
    <TabList aria-label="List of tabs" {...args}>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab disabled>Tab Label 3</Tab>
      <Tab>Tab Label 4 with a very long long label</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>
        <form style={{ margin: '2em' }}>
          <legend className={`cds--label`}>Validation example</legend>
          <Checkbox id="cb" labelText="Accept privacy policy" />
          <Button
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
            type="submit">
            Submit
          </Button>
          <TextInput
            type="text"
            labelText="Text input label"
            helperText="Optional help text"
          />
        </form>
      </TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Manual = (args) => (
  <Tabs>
    <TabList activation="manual" aria-label="List of tabs" {...args}>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab disabled>Tab Label 3</Tab>
      <Tab title="Tab Label 4 with a very long long label">
        Tab Label 4 with a very long long label
      </Tab>
      <Tab>Tab Label 5</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>
        <form style={{ margin: '2em' }}>
          <legend className={`cds--label`}>Validation example</legend>
          <Checkbox id="cb" labelText="Accept privacy policy" />
          <Button
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
            type="submit">
            Submit
          </Button>
          <TextInput
            type="text"
            labelText="Text input label"
            helperText="Optional help text"
          />
        </form>
      </TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Icon20Only = (args) => (
  <Tabs>
    <TabList iconSize="lg" aria-label="List of tabs" {...args}>
      <IconTab label="Monster" disabled>
        <Monster size={20} aria-label="Monster" />
      </IconTab>
      <IconTab label="Corn">
        <Corn size={20} aria-label="Corn" />
      </IconTab>
      <IconTab label="Bat">
        <Bat size={20} aria-label="Bat" />
      </IconTab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
    </TabPanels>
  </Tabs>
);

export const IconOnly = (args) => (
  <Tabs>
    <TabList iconSize="default" aria-label="List of tabs" {...args}>
      <IconTab label="Monster" disabled>
        <Monster aria-label="Monster" />
      </IconTab>
      <IconTab label="Corn">
        <Corn aria-label="Corn" />
      </IconTab>
      <IconTab label="Bat">
        <Bat aria-label="Bat" />
      </IconTab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Contained = (args) => (
  <Tabs>
    <TabList aria-label="List of tabs" contained {...args}>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab disabled>Tab Label 3</Tab>
      <Tab title="Tab Label 4 with a very long long title">
        Tab Label 4 with a very long long title
      </Tab>
      <Tab>Tab Label 5</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>
        <form style={{ margin: '2em' }}>
          <legend className={`cds--label`}>Validation example</legend>
          <Checkbox id="cb" labelText="Accept privacy policy" />
          <Button
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
            type="submit">
            Submit
          </Button>
          <TextInput
            type="text"
            labelText="Text input label"
            helperText="Optional help text"
          />
        </form>
      </TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Skeleton = (args) => {
  return (
    <div style={{ maxWidth: '100%' }} {...args}>
      <TabsSkeleton />
    </div>
  );
};
