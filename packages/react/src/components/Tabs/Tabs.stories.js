/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, IconTab } from './Tabs';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';
import Button from '../Button';
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
  argTypes: {
    light: {
      table: {
        disable: true,
      },
    },
  },
};

export const Default = () => (
  <Tabs>
    <TabList aria-label="List of tabs">
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab disabled>Tab Label 3</Tab>
      <Tab>Tab Label 4</Tab>
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
            id="text-input-1"
          />
        </form>
      </TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Manual = () => (
  <Tabs>
    <TabList activation="manual" aria-label="List of tabs">
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab disabled>Tab Label 3</Tab>
      <Tab title="Tab Label 4">Tab Label 4</Tab>
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
            id="text-input-1"
          />
        </form>
      </TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
      <TabPanel>Tab Panel 5</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Icon20Only = () => (
  <Tabs>
    <TabList iconSize="lg" aria-label="List of tabs">
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

export const IconOnly = () => (
  <Tabs>
    <TabList iconSize="default" aria-label="List of tabs">
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

export const Contained = () => (
  <Tabs>
    <TabList aria-label="List of tabs" contained>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab disabled>Tab Label 3</Tab>
      <Tab title="Tab Label 4">Tab Label 4</Tab>
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

export const ContainedWithSecondaryLabel = () => (
  <Tabs>
    <TabList aria-label="List of tabs" contained>
      <Tab secondaryLabel="367">Tab Label 1</Tab>
      <Tab secondaryLabel="367">Tab Label 2</Tab>
      <Tab disabled secondaryLabel="367">
        Tab Label 3
      </Tab>
      <Tab title="Tab Label 4" secondaryLabel="367">
        Tab Label 4
      </Tab>
      <Tab secondaryLabel="367">Tab Label 5</Tab>
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

export const Skeleton = () => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <TabsSkeleton />
    </div>
  );
};

export const Playground = (args) => (
  <Tabs>
    <TabList aria-label="List of tabs" {...args}>
      <Tab>Tab Label 1</Tab>
      <Tab>Tab Label 2</Tab>
      <Tab>Tab Label 3</Tab>
      <Tab>Tab Label 4</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
    </TabPanels>
  </Tabs>
);

Playground.argTypes = {
  automatic: {
    control: { type: 'select' },
    options: ['automatic', 'manual'],
  },
  contained: {
    control: {
      type: 'boolean',
    },
    defaultValue: false,
  },
  iconSize: {
    control: { type: 'select' },
    options: ['default', 'lg'],
  },
  leftOverflowButtonProps: {
    control: {
      type: 'object',
    },
  },
  rightOverflowButtonProps: {
    control: {
      type: 'object',
    },
  },
  scrollDebounceWait: {
    control: {
      type: 'number',
    },
    defaultValue: 200,
  },
  scrollIntoView: {
    control: {
      type: 'boolean',
    },
  },
};
