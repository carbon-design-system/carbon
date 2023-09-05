/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, IconTab } from './Tabs';
import TextInput from '../TextInput';
import Checkbox from '../Checkbox';
import Button from '../Button';
import { Grid, Column } from '../Grid';
import mdx from './Tabs.mdx';

import TabsSkeleton from './Tabs.Skeleton';
import {
  Dashboard,
  Activity,
  CloudMonitoring,
  Settings,
  Search,
  Notification,
  Chat,
  Task,
  Restart,
} from '@carbon/icons-react';

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
      <Tab>Dashboard</Tab>
      <Tab>Monitoring</Tab>
      <Tab>Activity</Tab>
      <Tab disabled>Settings</Tab>
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

export const Dismissable = () => {
  const tabs = [
    {
      label: 'Dashboard',
      panel: <TabPanel>Dashboard</TabPanel>,
    },
    {
      label: 'Monitoring',
      panel: <TabPanel>Monitoring</TabPanel>,
    },
    {
      label: 'Activity',
      panel: <TabPanel>Activity</TabPanel>,
    },
    {
      label: 'Settings',
      panel: <TabPanel>Settings</TabPanel>,
      disabled: true,
    },
  ];
  const [renderedTabs, setRenderedTabs] = useState(tabs);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabChange = (evt) => {
    setSelectedIndex(evt.selectedIndex);
  };

  const handleCloseTabRequest = (tabIndex) => {
    if (renderedTabs[tabIndex].disabled) {
      return;
    }
    const selectedTab = renderedTabs[selectedIndex];

    const filteredTabs = renderedTabs.filter((_, index) => index !== tabIndex);
    if (tabIndex === selectedIndex) {
      const defaultTabIndex = filteredTabs.findIndex((tab) => !tab.disabled);
      setSelectedIndex(defaultTabIndex);
    } else {
      setSelectedIndex(filteredTabs.indexOf(selectedTab));
    }
    setRenderedTabs(filteredTabs);
  };

  const resetTabs = () => {
    setRenderedTabs(tabs);
  };

  return (
    <>
      <Button style={{ marginBottom: '3rem' }} onClick={resetTabs}>
        Reset
      </Button>
      <Tabs
        selectedIndex={selectedIndex}
        onChange={handleTabChange}
        dismissable
        onTabCloseRequest={handleCloseTabRequest}>
        <TabList aria-label="List of tabs">
          {renderedTabs.map((tab, index) => (
            <Tab key={index} disabled={tab.disabled}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>{renderedTabs.map((tab) => tab.panel)}</TabPanels>
      </Tabs>
    </>
  );
};

export const DismissableWithIcons = ({ contained }) => {
  const tabs = [
    {
      label: 'Dashboard',
      panel: <TabPanel>Dashboard</TabPanel>,
    },
    {
      label: 'Monitoring',
      panel: <TabPanel>Monitoring</TabPanel>,
    },
    {
      label: 'Activity',
      panel: <TabPanel>Activity</TabPanel>,
    },
    {
      label: 'Settings',
      panel: <TabPanel>Settings</TabPanel>,
      disabled: true,
    },
  ];
  const [renderedTabs, setRenderedTabs] = useState(tabs);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTabChange = (evt) => {
    setSelectedIndex(evt.selectedIndex);
  };

  const handleCloseTabRequest = (tabIndex) => {
    if (renderedTabs[tabIndex].disabled) {
      return;
    }
    const selectedTab = renderedTabs[selectedIndex];

    const filteredTabs = renderedTabs.filter((_, index) => index !== tabIndex);
    if (tabIndex === selectedIndex) {
      const defaultTabIndex = filteredTabs.findIndex((tab) => !tab.disabled);
      setSelectedIndex(defaultTabIndex);
    } else {
      setSelectedIndex(filteredTabs.indexOf(selectedTab));
    }
    setRenderedTabs(filteredTabs);
  };

  const resetTabs = () => {
    setRenderedTabs(tabs);
  };

  const icons = [Dashboard, CloudMonitoring, Settings, Activity];

  return (
    <>
      <Button style={{ marginBottom: '3rem' }} onClick={resetTabs}>
        Reset
      </Button>
      <Tabs
        selectedIndex={selectedIndex}
        onChange={handleTabChange}
        dismissable
        onTabCloseRequest={handleCloseTabRequest}>
        <TabList aria-label="List of tabs" contained={contained}>
          {renderedTabs.map((tab, index) => (
            <Tab key={index} disabled={tab.disabled} renderIcon={icons[index]}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>{renderedTabs.map((tab) => tab.panel)}</TabPanels>
      </Tabs>
    </>
  );
};

export const WithIcons = () => (
  <Tabs>
    <TabList activation="manual" aria-label="List of tabs">
      <Tab renderIcon={Dashboard}>Dashboard</Tab>
      <Tab renderIcon={CloudMonitoring}>Monitoring</Tab>
      <Tab renderIcon={Activity}>Activity</Tab>
      <Tab renderIcon={Search}>Analyze</Tab>
      <Tab disabled renderIcon={Settings}>
        Settings
      </Tab>
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

export const Manual = () => (
  <Tabs>
    <TabList activation="manual" aria-label="List of tabs">
      <Tab>Dashboard</Tab>
      <Tab>Monitoring</Tab>
      <Tab title="Tab label 4">Activity</Tab>
      <Tab>Analyze</Tab>
      <Tab disabled>Settings</Tab>
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
      <IconTab label="Analyze" disabled>
        <Search size={20} aria-label="Analyze" />
      </IconTab>
      <IconTab label="Activity">
        <Activity size={20} aria-label="Activity" />
      </IconTab>
      <IconTab label="Notification">
        <Notification size={20} aria-label="Notification" />
      </IconTab>
      <IconTab label="Chat">
        <Chat size={20} aria-label="Chat" />
      </IconTab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
    </TabPanels>
  </Tabs>
);

export const IconOnly = () => (
  <Tabs>
    <TabList aria-label="List of tabs">
      <IconTab label="Analyze" disabled>
        <Search aria-label="Analyze" />
      </IconTab>
      <IconTab label="Activity">
        <Activity aria-label="Activity" />
      </IconTab>
      <IconTab label="Notification">
        <Notification aria-label="Notification" />
      </IconTab>
      <IconTab label="Chat">
        <Chat aria-label="Chat" />
      </IconTab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
    </TabPanels>
  </Tabs>
);

export const Contained = () => (
  <Tabs>
    <TabList aria-label="List of tabs" contained>
      <Tab>Dashboard</Tab>
      <Tab>Monitoring</Tab>
      <Tab>Activity</Tab>
      <Tab>Analyze</Tab>
      <Tab disabled>Settings</Tab>
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

export const ContainedWithIcons = () => (
  <Tabs>
    <TabList aria-label="List of tabs" contained>
      <Tab renderIcon={Dashboard}>Dashboard</Tab>
      <Tab renderIcon={CloudMonitoring}>Monitoring</Tab>
      <Tab renderIcon={Activity}>Activity</Tab>
      <Tab renderIcon={Search}>Analyze</Tab>
      <Tab disabled renderIcon={Settings}>
        Settings
      </Tab>
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

export const ContainedWithSecondaryLabels = () => (
  <Tabs>
    <TabList aria-label="List of tabs" contained>
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

export const ContainedWithSecondaryLabelsAndIcons = () => (
  <Tabs>
    <TabList aria-label="List of tabs" contained>
      <Tab renderIcon={Task} secondaryLabel="(21/25">
        Engage
      </Tab>
      <Tab renderIcon={Search} secondaryLabel="(12/16)">
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

export const ContainedFullWidth = () => (
  <Grid condensed>
    <Column lg={16} md={8} sm={4}>
      <Tabs>
        <TabList aria-label="List of tabs" contained fullWidth>
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
            <form>
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
          <TabPanel>Tab Panel 6</TabPanel>
          <TabPanel>Tab Panel 7</TabPanel>
          <TabPanel>Tab Panel 8</TabPanel>
        </TabPanels>
      </Tabs>
    </Column>
  </Grid>
);

export const Skeleton = () => {
  return (
    <div style={{ maxWidth: '100%' }}>
      <TabsSkeleton />
    </div>
  );
};

export const Playground = ({ dismissable, ...args }) => (
  <Tabs dismissable={dismissable} onTabCloseRequest={() => {}}>
    <TabList aria-label="List of tabs" {...args}>
      <Tab>Dashboard</Tab>
      <Tab>Monitoring</Tab>
      <Tab>Activity</Tab>
      <Tab>Settings</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>Tab Panel 1</TabPanel>
      <TabPanel>Tab Panel 2</TabPanel>
      <TabPanel>Tab Panel 3</TabPanel>
      <TabPanel>Tab Panel 4</TabPanel>
    </TabPanels>
  </Tabs>
);

Playground.args = {
  contained: false,
  dismissable: false,
  scrollDebounceWait: 200,
};

Playground.argTypes = {
  automatic: {
    control: { type: 'select' },
    options: ['automatic', 'manual'],
  },
  contained: {
    control: {
      type: 'boolean',
    },
  },
  dismissable: {
    control: {
      type: 'boolean',
    },
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
  },
  scrollIntoView: {
    control: {
      type: 'boolean',
    },
  },
};
