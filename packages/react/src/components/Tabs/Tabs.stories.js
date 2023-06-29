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
import { Monster, Corn, Bat, Bee, Home } from '@carbon/icons-react';

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
      <Tab>Tab label 1</Tab>
      <Tab>Tab label 2</Tab>
      <Tab disabled>Tab label 3</Tab>
      <Tab>Tab label 4</Tab>
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
      label: 'Tab label 1',
      panel: <TabPanel>Tab Panel 1</TabPanel>,
    },
    {
      label: 'Tab label 2',
      panel: <TabPanel>Tab Panel 2</TabPanel>,
    },
    {
      label: 'Tab label 3',
      panel: <TabPanel>Tab Panel 3</TabPanel>,
      disabled: true,
    },
    {
      label: 'Tab label 4',
      panel: <TabPanel>Tab Panel 4</TabPanel>,
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
      label: 'Tab label 1',
      panel: <TabPanel>Tab Panel 1</TabPanel>,
    },
    {
      label: 'Tab label 2',
      panel: <TabPanel>Tab Panel 2</TabPanel>,
    },
    {
      label: 'Tab label 3',
      panel: <TabPanel>Tab Panel 3</TabPanel>,
      disabled: true,
    },
    {
      label: 'Tab label 4',
      panel: <TabPanel>Tab Panel 4</TabPanel>,
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

  const icons = [Bat, Bee, Corn, Monster];

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
      <Tab renderIcon={Bee}>Tab label 1</Tab>
      <Tab renderIcon={Monster}>Tab label 2</Tab>
      <Tab disabled renderIcon={Corn}>
        Tab label 3
      </Tab>
      <Tab title="Tab label 4" renderIcon={Bat}>
        Tab label 4
      </Tab>
      <Tab renderIcon={Home}>Tab label 5</Tab>
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
      <Tab>Tab label 1</Tab>
      <Tab>Tab label 2</Tab>
      <Tab disabled>Tab label 3</Tab>
      <Tab title="Tab label 4">Tab label 4</Tab>
      <Tab>Tab label 5</Tab>
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
      <Tab>Tab label 1</Tab>
      <Tab>Tab label 2</Tab>
      <Tab disabled>Tab label 3</Tab>
      <Tab title="Tab label 4">Tab label 4</Tab>
      <Tab>Tab label 5</Tab>
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
      <Tab renderIcon={Bee}>Tab label 1</Tab>
      <Tab renderIcon={Monster}>Tab label 2</Tab>
      <Tab disabled renderIcon={Bat}>
        Tab label 3
      </Tab>
      <Tab title="Tab label 4" renderIcon={Corn}>
        Tab label 4
      </Tab>
      <Tab renderIcon={Home}>Tab label 5</Tab>
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
      <Tab secondaryLabel="367">Tab label 1</Tab>
      <Tab secondaryLabel="367">Tab label 2</Tab>
      <Tab disabled secondaryLabel="367">
        Tab label 3
      </Tab>
      <Tab title="Tab label 4" secondaryLabel="367">
        Tab label 4
      </Tab>
      <Tab secondaryLabel="367">Tab label 5</Tab>
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
      <Tab renderIcon={Bee} secondaryLabel="367">
        Tab label 1
      </Tab>
      <Tab renderIcon={Monster} secondaryLabel="367">
        Tab label 2
      </Tab>
      <Tab renderIcon={Bat} disabled secondaryLabel="367">
        Tab label 3
      </Tab>
      <Tab renderIcon={Corn} title="Tab label 4" secondaryLabel="367">
        Tab label 4
      </Tab>
      <Tab renderIcon={Home} secondaryLabel="367">
        Tab label 5
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
          <Tab>Tab Label 1</Tab>
          <Tab>Tab Label 2</Tab>
          <Tab disabled>Tab Label 3</Tab>
          <Tab>Tab Label 4 with a very long long title</Tab>
          <Tab>Tab Label 5</Tab>
          <Tab>Tab Label 6</Tab>
          <Tab>Tab Label 7</Tab>
          <Tab>Tab Label 8</Tab>
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
      <Tab>Tab label 1</Tab>
      <Tab>Tab label 2</Tab>
      <Tab>Tab label 3</Tab>
      <Tab>Tab label 4</Tab>
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
