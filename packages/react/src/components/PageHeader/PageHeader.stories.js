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
  PageHeaderContentPageActions,
  PageHeaderHeroImage,
  PageHeaderTabs,
} from '../PageHeader';
import { Tag } from '../Tag';
import { Button } from '../Button';
import { Grid, Column } from '../Grid';
import { Breadcrumb, BreadcrumbItem } from '../Breadcrumb';
import { breakpoints } from '@carbon/layout';
import image1 from './_story-assets/2x1.jpg';
import image2 from './_story-assets/3x2.jpg';

import { Bee, AiGenerate, CloudFoundry_1, Activity } from '@carbon/icons-react';
import mdx from './PageHeader.mdx';
import { TabList, Tab, TabPanels, TabPanel } from '../Tabs/Tabs';

export default {
  title: 'Patterns/unstable__PageHeader',
  component: PageHeader,
  subcomponents: {
    PageHeaderBreadcrumbBar,
    PageHeaderContent,
    PageHeaderHeroImage,
    PageHeaderTabBar,
    PageHeaderTabs,
    PageHeaderContentText,
    PageHeaderContentPageActions,
  },
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
  decorators: [
    (Story) => (
      <>
        <style>
          {`
          .sb-show-main.sb-main-padded {
            padding-left: 0;
            padding-right: 0;
            padding-top: 0;
          }
        `}
        </style>
        <Story />
      </>
    ),
  ],
};

const BeeIcon = () => <Bee size={32} />;

const BreadcrumbBeeIcon = () => <Bee size={16} />;

const breadcrumbPageActions = (
  <>
    <Button
      renderIcon={Activity}
      iconDescription="Icon Description 1"
      hasIconOnly
      size="md"
      kind="ghost"
    />
    <Button
      renderIcon={AiGenerate}
      iconDescription="Icon Description 2"
      hasIconOnly
      size="md"
      kind="ghost"
    />
    <Button
      renderIcon={CloudFoundry_1}
      iconDescription="Icon Description 3"
      hasIconOnly
      size="md"
      kind="ghost"
    />
  </>
);

const breadcrumbContentActions = (
  <>
    <Button size="md">Button</Button>
  </>
);

export const Default = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar
      border={args.border}
      pageActionsFlush={args.pageActionsFlush}
      contentActionsFlush={args.contentActionsFlush}
      renderIcon={args.renderBreadcrumbIcon ? BreadcrumbBeeIcon : null}
      contentActions={breadcrumbContentActions}
      pageActions={breadcrumbPageActions}>
      <Breadcrumb>
        <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      </Breadcrumb>
    </PageHeader.BreadcrumbBar>
    <PageHeader.Content title={args.title}>
      <PageHeader.ContentText subtitle="Subtitle">
        Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
        Massa elementum class enim malesuada lacinia hendrerit enim erat
        pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
        Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
      </PageHeader.ContentText>
    </PageHeader.Content>
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

Default.args = {
  border: true,
  pageActionsFlush: false,
  contentActionsFlush: false,
  title:
    'Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long',
  renderBreadcrumbIcon: true,
};

Default.argTypes = {
  border: {
    description: 'Specify whether to render BreadcrumbBar border',
    control: {
      type: 'boolean',
    },
  },
  pageActionsFlush: {
    description:
      'Specify whether the page actions within BreadcrumbBar should be flush',
    control: {
      type: 'boolean',
    },
  },
  contentActionsFlush: {
    description:
      'Specify whether the content actions within BreadcrumbBar should be flush with the page actions',
    control: {
      type: 'boolean',
    },
  },
  title: {
    description:
      'Provide the title text to be rendered within  PageHeaderContent',
    control: {
      type: 'text',
    },
  },
  renderBreadcrumbIcon: {
    description:
      'Specify whether to render the BreadcrumbBar icon (storybook control only)',
    control: {
      type: 'boolean',
    },
  },
};

export const ContentWithIcon = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar pageActions={breadcrumbPageActions}>
      <Breadcrumb>
        <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      </Breadcrumb>
    </PageHeader.BreadcrumbBar>
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
    <PageHeader.BreadcrumbBar
      renderIcon={BreadcrumbBeeIcon}
      pageActions={breadcrumbPageActions}>
      <Breadcrumb>
        <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      </Breadcrumb>
    </PageHeader.BreadcrumbBar>
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      contextualActions={
        <>
          <Tag className="tag" type="blue" size="lg">
            Tag
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
  <PageHeader.Root withHeroImage>
    <Grid>
      <Column lg={8} md={4} sm={4}>
        <PageHeader.BreadcrumbBar border={false} renderIcon={BreadcrumbBeeIcon}>
          <Breadcrumb>
            <BreadcrumbItem>
              <a href="/#">Breadcrumb 1</a>
            </BreadcrumbItem>
            <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
          </Breadcrumb>
        </PageHeader.BreadcrumbBar>
        <PageHeader.Content
          title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
          {...args}>
          <PageHeader.ContentText subtitle="Subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex.
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
);

const pageActionButtonItems = [
  {
    // props used for both collapse menu item and non-collapsed action form
    id: 'action1',
    onClick: () => console.log(`Action 1`),
    // component to render when non-collapsed
    body: (
      <Button
        renderIcon={AiGenerate}
        iconDescription="Icon Description 1"
        hasIconOnly
        size="md"
        kind="ghost"
      />
    ),
    // props to pass to the corresponding collapsed menu item
    menuItem: {
      label: 'action 1',
    },
  },
  {
    id: 'action2',
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
    menuItem: {
      label: 'action 2',
    },
  },
  {
    id: 'action3',
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
    menuItem: {
      label: 'action 3',
    },
  },
  {
    id: 'action4',
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
    menuItem: {
      label: 'action 4',
    },
  },
  {
    id: 'primary-action',
    onClick: () => console.log(`Primary action`),
    body: (
      <Button kind="primary" renderIcon={Add} size="md">
        Primary action
      </Button>
    ),
    menuItem: {
      label: 'Primary action',
    },
  },
];

export const ContentWithContextualActionsAndPageActions = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar
      renderIcon={BreadcrumbBeeIcon}
      pageActions={breadcrumbPageActions}>
      <Breadcrumb>
        <BreadcrumbItem href="/#">Breadcrumb 1</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      </Breadcrumb>
    </PageHeader.BreadcrumbBar>
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      contextualActions={
        <>
          <Tag className="tag" type="blue" size="lg">
            Tag
          </Tag>
        </>
      }
      pageActions={
        <PageHeader.ContentPageActions
          menuButtonLabel="Actions"
          actions={pageActionButtonItems}></PageHeader.ContentPageActions>
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
