/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { Add } from '@carbon/icons-react';
import { unstable__PageHeader as PageHeader } from '../../';
import {
  PageHeader as PageHeaderDirect,
  PageHeaderBreadcrumbBar,
  PageHeaderContent,
  PageHeaderTabBar,
  PageHeaderContentText,
  PageHeaderHeroImage,
  PageHeaderTabs,
} from '../PageHeader';
import { Dropdown } from '../Dropdown';
import { Tag } from '../Tag';
import { ContentSwitcher } from '../ContentSwitcher';
import { IconSwitch } from '../Switch';
import { Button } from '../Button';
import { Grid, Column } from '../Grid';
import { breakpoints } from '@carbon/layout';
import image1 from './_story-assets/2x1.jpg';
import image2 from './_story-assets/3x2.jpg';

import {
  Bee,
  AiGenerate,
  CloudFoundry_1,
  Activity,
  PartitionAuto,
  TaskAdd,
  TableOfContents,
  Workspace,
  ViewMode_2,
} from '@carbon/icons-react';
import mdx from './PageHeader.mdx';
import { TabList, Tab, TabPanels, TabPanel } from '../Tabs/Tabs';

const BeeIcon = () => <Bee size={32} />;

const dropdownItems = [
  {
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    text: 'Option 1',
  },
  {
    text: 'Option 2',
  },
  {
    disabled: true,
    text: 'Option 3 - a disabled item',
  },
  {
    text: 'Option 4',
  },
  {
    text: 'Option 5',
  },
  {
    text: 'Option 6',
  },
  {
    text: 'Option 7',
  },
  {
    text: 'Option 8',
  },
];

export default {
  title: 'Patterns/unstable__PageHeader',
  component: PageHeader,
  subcomponents: {
    PageHeaderBreadcrumbBar,
    PageHeaderContent,
    PageHeaderHeroImage,
    PageHeaderTabBar,
    PageHeaderTabs,
  },
  // uncomment includeStories before merging so the stories aren't visible in prod
  includeStories: [],
  argTypes: {
    children: {
      control: false, // ReactNode props don't work in the controls pane
    },
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => (
  <PageHeader.Root {...args}>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content />
    <PageHeader.TabBar>
      <PageHeader.Tabs>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Monitoring</Tab>
          <Tab>Activity</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Dashboard Tab Panel</TabPanel>
          <TabPanel>Monitoring Tab Panel</TabPanel>
          <TabPanel>Activity Tab Panel</TabPanel>
          <TabPanel>Settings Tab Panel</TabPanel>
        </TabPanels>
      </PageHeader.Tabs>
    </PageHeader.TabBar>
  </PageHeader.Root>
);

export const BreadcrumbBar = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar {...args} />
  </PageHeader.Root>
);

export const Content = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content
      title="Page header content title with an extra long title that turns into a definition tooltip that creates a title with an ellipsis."
      {...args}>
      <PageHeader.ContentText subtitle="Subtitle">
        Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
        Massa elementum class enim malesuada lacinia hendrerit enim erat
        pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
        Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
      </PageHeader.ContentText>
    </PageHeader.Content>
  </PageHeader.Root>
);

export const ContentWithIcon = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      renderIcon={BeeIcon}
      {...args}>
      <PageHeader.ContentText subtitle="Subtitle">
        Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
        Massa elementum class enim malesuada lacinia hendrerit enim erat
        pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
        Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
      </PageHeader.ContentText>
    </PageHeader.Content>
  </PageHeader.Root>
);

export const ContentWithContextualActions = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      contextualActions={
        <>
          <Tag className="tag" type="blue" size="lg">
            Moop
          </Tag>
        </>
      }
      {...args}>
      <PageHeader.ContentText subtitle="Subtitle">
        Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
        Massa elementum class enim malesuada lacinia hendrerit enim erat
        pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
        Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
      </PageHeader.ContentText>
    </PageHeader.Content>
  </PageHeader.Root>
);

export const ContentWithHeroImage = (args) => (
  <Grid>
    <Column lg={16} md={8} sm={4}>
      <PageHeader.Root>
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <PageHeader.BreadcrumbBar />
            <PageHeader.Content
              title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
              {...args}>
              <PageHeader.ContentText subtitle="Subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex.
              </PageHeader.ContentText>
            </PageHeader.Content>
          </Column>
          <Column lg={8} md={4} sm={0}>
            <PageHeader.HeroImage>
              <picture>
                <source
                  srcset={image1}
                  media={`(min-width: ${breakpoints.lg.width})`}
                />
                <source
                  srcset={image2}
                  media={`(max-width: ${breakpoints.lg.width})`}
                />
                <img
                  src={image1}
                  alt="a default image"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </picture>
            </PageHeader.HeroImage>
          </Column>
        </Grid>
      </PageHeader.Root>
    </Column>
  </Grid>
);

ContentWithHeroImage.decorators = [
  (Story) => (
    <>
      <style>
        {`
          .sb-show-main.sb-main-padded {
            padding-left: 0;
            padding-right: 0;
          }
        `}
      </style>
      <Story />
    </>
  ),
];

const pageActionItems = (
  <>
    <ContentSwitcher onChange={() => {}}>
      <IconSwitch name="one" text="Table of Contents">
        <TableOfContents />
      </IconSwitch>
      <IconSwitch name="two" text="Workspace Test">
        <Workspace />
      </IconSwitch>
      <IconSwitch name="three" text="View Mode">
        <ViewMode_2 />
      </IconSwitch>
    </ContentSwitcher>
    <Button kind="primary" renderIcon={Add} size="md">
      Primary action
    </Button>
  </>
);

const pageActionButtonItems = [
  {
    id: 'action1',
    label: 'action 1',
    onClick: () => console.log(`Action 1`),
    body: (
      <Button
        renderIcon={AiGenerate}
        iconDescription="Icon Description 1"
        hasIconOnly
        size="md"
        kind="ghost"
      />
    ),
  },
  {
    id: 'action2',
    label: 'action 2',
    onClick: () => console.log(`Action 2`),
    body: (
      <Button
        renderIcon={Activity}
        iconDescription="Icon Description 2"
        hasIconOnly
        size="md"
        kind="ghost"
      />
    ),
  },
  {
    id: 'action3',
    label: 'action 3',
    onClick: () => console.log(`Action 3`),
    body: (
      <Button
        renderIcon={Activity}
        iconDescription="Icon Description 3"
        hasIconOnly
        size="md"
        kind="ghost"
      />
    ),
  },
  {
    id: 'action4',
    label: 'action 4',
    onClick: () => console.log(`Action 4`),
    body: (
      <Button
        renderIcon={Activity}
        iconDescription="Icon Description 4"
        hasIconOnly
        size="md"
        kind="ghost"
      />
    ),
  },
  {
    id: 'primary-action',
    label: 'Primary action',
    onClick: () => console.log(`Primary action`),
    body: (
      <Button kind="primary" renderIcon={Add} size="md">
        Primary action
      </Button>
    ),
  },
];

export const ContentWithContextualActionsAndPageActions = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      contextualActions={
        <>
          <Tag className="tag" type="blue" size="lg">
            Moop
          </Tag>
        </>
      }
      pageActions={
        <PageHeader.ContentPageActions
          menuButtonLabel="Actions"
          pageActions={pageActionButtonItems}></PageHeader.ContentPageActions>
      }
      {...args}>
      <PageHeader.ContentText subtitle="Subtitle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.
      </PageHeader.ContentText>
    </PageHeader.Content>
  </PageHeader.Root>
);

export const TabBar = (args) => {
  return (
    <PageHeader.Root>
      <PageHeader.TabBar {...args}>
        <PageHeader.Tabs>
          <TabList>
            <Tab>Dashboard</Tab>
            <Tab>Monitoring</Tab>
            <Tab>Activity</Tab>
            <Tab>Settings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel key={0}>Dashboard Tab Panel</TabPanel>
            <TabPanel>Monitoring Tab Panel</TabPanel>
            <TabPanel>Activity Tab Panel</TabPanel>
            <TabPanel>Settings Tab Panel</TabPanel>
          </TabPanels>
        </PageHeader.Tabs>
      </PageHeader.TabBar>
    </PageHeader.Root>
  );
};

export const DirectExports = (args) => (
  <PageHeaderDirect {...args}>
    <PageHeaderBreadcrumbBar />
    <PageHeaderContent />
    <PageHeaderTabBar>
      <PageHeaderTabs>
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Monitoring</Tab>
          <Tab>Activity</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Dashboard Tab Panel</TabPanel>
          <TabPanel>Monitoring Tab Panel</TabPanel>
          <TabPanel>Activity Tab Panel</TabPanel>
          <TabPanel>Settings Tab Panel</TabPanel>
        </TabPanels>
      </PageHeaderTabs>
    </PageHeaderTabBar>
  </PageHeaderDirect>
);
