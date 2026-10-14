/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  Tabs,
  TabsVertical,
  TabList,
  TabListVertical,
  Tab,
  TabPanels,
  TabPanel,
} from './Tabs';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';
import Button from '../Button';
import RadioButtonGroup from '../RadioButtonGroup';
import RadioButton from '../RadioButton';
import { Stack } from '../Stack';
import { Grid, Column } from '../Grid';
import {
  Dashboard,
  Activity,
  CloudMonitoring,
  Settings,
  IbmWatsonDiscovery,
  Task,
  Restart,
} from '@carbon/icons-react';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Components/Tabs/Feature Flag',
  component: Tabs,
  subcomponents: {
    TabsVertical,
    TabList,
    TabListVertical,
    Tab,
    TabPanels,
    TabPanel,
  },
  tags: ['!autodocs'],
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <Story />
      </WithFeatureFlags>
    ),
  ],
};

const sizeArgType = {
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Specify the size of the tabs',
  },
};

const sizeArgs = {
  size: 'lg',
};

const ValidationExample = () => (
  <form style={{ margin: '2em' }}>
    <legend className={`cds--label`}>Validation example</legend>
    <Checkbox id="cb" labelText="Accept privacy policy" />
    <Button style={{ marginTop: '1rem', marginBottom: '1rem' }} type="submit">
      Submit
    </Button>
    <TextInput
      type="text"
      labelText="Text input label"
      helperText="Optional help text"
    />
  </form>
);

/**
 * With `enable-v12-tabs-contained-layer`, `TabPanel` wraps its content in a
 * `Layer` when the tabs are contained, so fields do not need a manual `Layer`.
 */
export const Contained = (args) => {
  return (
    <Tabs>
      <TabList contained size={args.size}>
        <Tab>Dashboard</Tab>
        <Tab>Monitoring</Tab>
        <Tab>Activity</Tab>
        <Tab>Analyze</Tab>
        <Tab disabled>Settings</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <ValidationExample />
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

Contained.argTypes = sizeArgType;
Contained.args = sizeArgs;

export const ContainedWithIcons = (args) => {
  return (
    <Tabs>
      <TabList contained size={args.size}>
        <Tab renderIcon={Dashboard}>Dashboard</Tab>
        <Tab renderIcon={CloudMonitoring}>Monitoring</Tab>
        <Tab renderIcon={Activity}>Activity</Tab>
        <Tab renderIcon={IbmWatsonDiscovery}>Analyze</Tab>
        <Tab disabled renderIcon={Settings}>
          Settings
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <ValidationExample />
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

ContainedWithIcons.argTypes = sizeArgType;
ContainedWithIcons.args = sizeArgs;

export const ContainedWithSecondaryLabels = () => {
  return (
    <Tabs>
      <TabList contained>
        <Tab secondaryLabel="(21/25)">Engage</Tab>
        <Tab secondaryLabel="(12/16)">Analyze</Tab>
        <Tab secondaryLabel="(0/7)">Remediate</Tab>
        <Tab secondaryLabel="(4/12)">Assets</Tab>
        <Tab disabled secondaryLabel="(0/10)">
          Monitoring
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <ValidationExample />
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const ContainedWithSecondaryLabelsAndIcons = () => {
  return (
    <Tabs>
      <TabList contained>
        <Tab renderIcon={Task} secondaryLabel="(21/25)">
          Engage
        </Tab>
        <Tab renderIcon={IbmWatsonDiscovery} secondaryLabel="(12/16)">
          Analyze
        </Tab>
        <Tab renderIcon={Restart} disabled secondaryLabel="(0/7)">
          Remediate
        </Tab>
        <Tab renderIcon={Dashboard} secondaryLabel="(4/12)">
          Assets
        </Tab>
        <Tab renderIcon={CloudMonitoring} secondaryLabel="(1/23)">
          Monitoring
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <ValidationExample />
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export const ContainedFullWidth = (args) => {
  return (
    <Grid condensed>
      <Column lg={16} md={8} sm={4}>
        <Tabs>
          <TabList contained fullWidth size={args.size}>
            <Tab>TLS</Tab>
            <Tab>Origin</Tab>
            <Tab disabled>Rate limiting</Tab>
            <Tab>WAF</Tab>
            <Tab>IP Firewall</Tab>
            <Tab>Firewall rules</Tab>
            <Tab>Range</Tab>
            <Tab>Mutual TLS</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>Tab Panel 1</TabPanel>
            <TabPanel>
              <ValidationExample />
            </TabPanel>
            <TabPanel>Tab Panel 3</TabPanel>
            <TabPanel>Tab Panel 4</TabPanel>
            <TabPanel>Tab Panel 5</TabPanel>
            <TabPanel>Tab Panel 6</TabPanel>
            <TabPanel>Tab Panel 7</TabPanel>
            <TabPanel>Tab Panel 8</TabPanel>
          </TabPanels>
        </Tabs>
      </Column>
    </Grid>
  );
};

ContainedFullWidth.argTypes = sizeArgType;
ContainedFullWidth.args = sizeArgs;

export const Vertical = (args) => {
  const { size, ...tabsVerticalArgs } = args;
  return (
    <TabsVertical {...tabsVerticalArgs}>
      <TabListVertical size={size}>
        <Tab>Dashboard</Tab>
        <Tab>
          Extra long label that will go two lines then truncate when it goes
          beyond the Tab length
        </Tab>
        <Tab>Activity</Tab>
        <Tab>Analyze</Tab>
        <Tab>Investigate </Tab>
        <Tab>Learn</Tab>
        <Tab disabled>Settings</Tab>
      </TabListVertical>
      <TabPanels>
        <TabPanel>Tab Panel 1</TabPanel>
        <TabPanel>
          <form style={{ margin: '2em' }}>
            <Stack gap={7}>
              <TextInput id="one" labelText="First Name" />
              <TextInput id="three" labelText="Middle Initial" />
              <TextInput id="two" labelText="Last Name" />
              <RadioButtonGroup
                legendText="Radio button heading"
                name="formgroup-default-radio-button-group"
                defaultSelected="radio-1">
                <RadioButton
                  labelText="Option 1"
                  value="radio-1"
                  id="radio-1"
                />
                <RadioButton
                  labelText="Option 2"
                  value="radio-2"
                  id="radio-2"
                />
                <RadioButton
                  labelText="Option 3"
                  value="radio-3"
                  id="radio-3"
                />
              </RadioButtonGroup>
              <Checkbox labelText={`Checkbox one`} id="checkbox-label-1" />
              <Checkbox labelText={`Checkbox two`} id="checkbox-label-2" />
              <Button>Submit</Button>
            </Stack>
          </form>
        </TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
        <TabPanel>Tab Panel 4</TabPanel>
        <TabPanel>Tab Panel 5</TabPanel>
        <TabPanel>Tab Panel 6</TabPanel>
        <TabPanel>Tab Panel 7</TabPanel>
      </TabPanels>
    </TabsVertical>
  );
};

Vertical.args = {
  height: '',
  size: 'xl',
};

Vertical.argTypes = {
  height: {
    control: {
      type: 'text',
    },
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg', 'xl'],
    description: 'Specify the size of the vertical tabs',
  },
};
