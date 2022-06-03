/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, IconTab } from './Tabs';
import Link from '../../Link';
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

const tabPanelEnums = {
  tab1: {
    labelText: 'Tab Label 1',
    panelText: 'Tab Panel 1',
  },
  tab2: {
    labelText: 'Tab Label 2',
    panelText: 'Tab Panel 2 with',
    linkText: 'interactive content',
  },
  tab3: {
    labelText: 'Tab Label 3',
    panelText: 'Tab Panel 3',
  },
  tab4: {
    labelText: 'Tab Label 4 with a very long long title',
    panelText: 'Tab Panel 4',
  },
  tab5: {
    labelText: 'Tab Label 5',
    panelText: 'Tab Panel 5',
  },
};
export const Line = (args) => (
  <Tabs>
    <TabList aria-label="List of tabs" {...args}>
      <Tab>{tabPanelEnums.tab1.labelText}</Tab>
      <Tab>{tabPanelEnums.tab2.labelText}</Tab>
      <Tab disabled>{tabPanelEnums.tab3.labelText}</Tab>
      <Tab>{tabPanelEnums.tab4.labelText}</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <p>{tabPanelEnums.tab1.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>
          {tabPanelEnums.tab2.panelText}{' '}
          <Link size="lg">{tabPanelEnums.tab2.linkText}</Link>
        </p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab3.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab4.panelText}</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export const Manual = (args) => (
  <Tabs>
    <TabList activation="manual" aria-label="List of tabs" {...args}>
      <Tab>{tabPanelEnums.tab1.labelText}</Tab>
      <Tab>{tabPanelEnums.tab2.labelText}</Tab>
      <Tab disabled>{tabPanelEnums.tab3.labelText}</Tab>
      <Tab title={tabPanelEnums.tab4.labelText}>
        {tabPanelEnums.tab4.labelText}
      </Tab>
      <Tab>{tabPanelEnums.tab5.labelText}</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <p>{tabPanelEnums.tab1.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>
          {tabPanelEnums.tab2.panelText}{' '}
          <Link size="lg">{tabPanelEnums.tab2.linkText}</Link>
        </p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab3.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab4.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab5.panelText}</p>
      </TabPanel>
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
      <TabPanel>
        <p>{tabPanelEnums.tab1.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>
          {tabPanelEnums.tab2.panelText}{' '}
          <Link size="lg">{tabPanelEnums.tab2.linkText}</Link>
        </p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab3.panelText}</p>
      </TabPanel>
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
      <TabPanel>
        <p>{tabPanelEnums.tab1.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>
          {tabPanelEnums.tab2.panelText}{' '}
          <Link size="lg">{tabPanelEnums.tab2.linkText}</Link>
        </p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab3.panelText}</p>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export const Contained = (args) => (
  <Tabs>
    <TabList aria-label="List of tabs" contained {...args}>
      <Tab>{tabPanelEnums.tab1.linkText}</Tab>
      <Tab>{tabPanelEnums.tab2.labelText}</Tab>
      <Tab disabled>{tabPanelEnums.tab3.labelText}</Tab>
      <Tab title={tabPanelEnums.tab4.labelText}>
        {tabPanelEnums.tab4.labelText}
      </Tab>
      <Tab>{tabPanelEnums.tab5.labelText}</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <p>{tabPanelEnums.tab1.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>
          {tabPanelEnums.tab2.panelText}{' '}
          <Link size="lg">{tabPanelEnums.tab2.linkText}</Link>
        </p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab3.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab4.panelText}</p>
      </TabPanel>
      <TabPanel>
        <p>{tabPanelEnums.tab5.panelText}</p>
      </TabPanel>
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
