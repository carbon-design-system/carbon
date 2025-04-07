/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { unstable__PageHeader as PageHeader } from '../../';
import {
  PageHeader as PageHeaderDirect,
  PageHeaderBreadcrumbBar,
  PageHeaderContent,
  PageHeaderTabBar,
  PageHeaderHeroImage,
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
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../Tabs/Tabs';

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
  },
  // includeStories: [],
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

const tabs = [
  {
    label: 'Tab 1',
    panel: (
      <TabPanel key={0}>
        <p>Tab 1</p>
        <p>page header demo</p>
        <p>
          Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
          Massa elementum class enim malesuada lacinia hendrerit enim erat
          pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
          Nisi molestie primis lorem nascetur sem metus mattis etiam
          scelerisque. Facilisi himenaeos massa bibendum sapien malesuada
          dictumst malesuada nisi! Nunc eget sagittis diam urna aliquet duis
          magna senectus velit ornare etiam per? Pretium himenaeos urna pretium
          praesent ad libero mi cubilia lobortis dignissim id arcu. Congue
          hendrerit donec suspendisse. Turpis vehicula ultrices ultricies.
        </p>
        <p>
          Viverra eros urna, sagittis vivamus suspendisse pellentesque porta
          quisque aliquet. Eu porta augue volutpat etiam sagittis tortor
          senectus ut, vulputate varius malesuada facilisi. Curae; senectus
          nulla ornare potenti elit varius leo? Sapien elit potenti neque urna,
          facilisis proin lorem. Eros, penatibus a faucibus sodales phasellus
          nisi. Nunc semper lorem mollis nullam metus ut iaculis senectus
          himenaeos curae;. Natoque orci condimentum turpis nibh porta! Sagittis
          tincidunt est cursus vitae neque sapien pulvinar scelerisque
          ridiculus. Scelerisque turpis orci gravida class magna id sit donec
          porttitor faucibus massa vivamus.
        </p>
        <p>
          Pellentesque urna torquent adipiscing interdum neque porta
          pellentesque. Orci ridiculus inceptos pulvinar cras? Pellentesque mus
          maecenas felis hendrerit auctor scelerisque turpis donec justo mollis!
          Sociosqu lacinia pellentesque dolor nulla. Placerat velit potenti
          morbi nullam mi in tortor nisl curabitur ante magna suscipit. Porta
          urna ipsum aenean massa tincidunt pulvinar. Quis porttitor quisque mi
          nunc vel feugiat nisl libero non posuere mattis et. Mollis
          pellentesque et leo dictumst torquent. Sem ligula quis egestas tempor
          facilisi, tortor varius montes congue! Eros taciti tortor ut fusce,
          commodo condimentum sit vel augue aptent et id.
        </p>
        <p>
          Suspendisse enim sollicitudin blandit blandit! Metus ad vitae
          venenatis turpis. Porttitor urna mollis semper commodo! Vehicula
          ridiculus himenaeos justo ut in platea cras facilisis potenti nostra
          facilisis? Orci habitant, ac himenaeos volutpat. Montes nullam fusce
          habitasse semper primis et! Iaculis praesent sit platea nam tortor?
          Penatibus quam tristique tempus vulputate facilisis dapibus dapibus
          ornare accumsan, urna dictumst. Posuere nascetur feugiat velit felis
          auctor aenean sociosqu bibendum? Turpis diam enim bibendum curae;
          viverra a orci dignissim montes ac.
        </p>
        <p>
          Ornare ac ligula accumsan aptent etiam ut auctor ut commodo erat.
          Convallis ad donec tempus montes lacus volutpat quisque congue.
          Gravida sodales pellentesque sociis orci ut mauris semper auctor odio
          nulla. Natoque posuere phasellus consectetur sed semper non aptent!
          Placerat eros laoreet consectetur eros molestie eros nec nisi vivamus
          morbi? Torquent cras ultricies ut pretium urna platea nam adipiscing
          consequat. Iaculis egestas at malesuada id dapibus rhoncus sapien at?
          Accumsan laoreet per primis elementum metus magnis dis tristique
          consectetur.
        </p>
      </TabPanel>
    ),
  },
  {
    label: 'Tab 2',
    panel: (
      <TabPanel key={1}>
        <p>Tab 2</p>
      </TabPanel>
    ),
  },
  {
    label: 'Tab 3',
    panel: (
      <TabPanel key={2}>
        <p>Tab 3</p>
      </TabPanel>
    ),
    disabled: true,
  },
  {
    label: 'Tab 4',
    panel: (
      <TabPanel key={3}>
        <p>Tab 4</p>
      </TabPanel>
    ),
  },
  {
    label: 'Tab 5',
    panel: (
      <TabPanel key={4}>
        <p>Tab 5</p>
      </TabPanel>
    ),
  },
  {
    label: 'Tab 6',
    panel: (
      <TabPanel key={5}>
        <p>Tab 6</p>
      </TabPanel>
    ),
  },
  {
    label: 'Tab 7',
    panel: (
      <TabPanel key={6}>
        <p>Tab 7</p>
      </TabPanel>
    ),
  },
  {
    label: 'Tab 8',
    panel: (
      <TabPanel key={7}>
        <p>Tab 8</p>
      </TabPanel>
    ),
  },
  {
    label: 'Tab 9',
    panel: (
      <TabPanel key={8}>
        <p>Tab 9</p>
      </TabPanel>
    ),
  },
  {
    label: 'Tab 10',
    panel: (
      <TabPanel key={9}>
        <p>Tab 10</p>
      </TabPanel>
    ),
  },
];
const TabComponent = () => (
  <Tabs onTabCloseRequest={() => {}}>
    <TabList>
      {tabs.map((tab, index) => (
        <Tab key={index} disabled={tab.disabled}>
          {tab.label}
        </Tab>
      ))}
    </TabList>
    <TabPanels>{tabs.map((tab) => tab.panel)}</TabPanels>
  </Tabs>
);

export const Default = (args) => (
  <PageHeader.Root {...args}>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content />
    <PageHeader.TabBar tabs={TabComponent()} />
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
      subtitle="Subtitle"
      {...args}>
      Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
      Massa elementum class enim malesuada lacinia hendrerit enim erat
      pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
      Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
    </PageHeader.Content>
    <PageHeader.TabBar tabs={TabComponent()} />
  </PageHeader.Root>
);

export const ContentWithIcon = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      subtitle="Subtitle"
      renderIcon={BeeIcon}
      {...args}>
      Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
      Massa elementum class enim malesuada lacinia hendrerit enim erat
      pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
      Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
    </PageHeader.Content>
    <PageHeader.TabBar tabs={TabComponent()} />
  </PageHeader.Root>
);

export const ContentWithContextualActions = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      subtitle="Subtitle"
      contextualActions={
        <>
          <Dropdown
            style={{ paddingRight: '1rem' }}
            className="dropdown"
            hideLabel
            id="default"
            items={dropdownItems}
            itemToString={(item) => (item ? item.text : '')}
            label="This is an example label"
            titleText="This is an example title"
          />
          <Tag className="tag" type="blue" size="lg">
            Moop
          </Tag>
        </>
      }
      {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.
    </PageHeader.Content>
    <PageHeader.TabBar tabs={TabComponent()} />
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
              subtitle="Subtitle"
              {...args}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex.
            </PageHeader.Content>
          </Column>
          <Column lg={8} md={4} sm={0}>
            <PageHeader.HeroImage>
              <picture>
                <source
                  srcset={image1}
                  media={`(min-width: ${breakpoints.lg.width}`}
                />
                <source
                  srcset={image2}
                  media={`(max-width: ${breakpoints.lg.width}`}
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
        <PageHeader.TabBar tabs={TabComponent()} />
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

export const ContentWithContextualActionsAndPageActions = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content
      title="Virtual-Machine-DAL-really-long-title-example-that-goes-at-least-2-lines-long"
      subtitle="Subtitle"
      contextualActions={
        <>
          <Dropdown
            style={{ paddingRight: '1rem' }}
            className="dropdown"
            hideLabel
            id="default"
            items={dropdownItems}
            itemToString={(item) => (item ? item.text : '')}
            label="This is an example label"
            titleText="This is an example title"
          />
          <Tag className="tag" type="blue" size="lg">
            Moop
          </Tag>
        </>
      }
      pageActions={
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
          <Button kind="primary" size="md">
            Button
          </Button>
        </>
      }
      {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex.
    </PageHeader.Content>
    <PageHeader.TabBar tabs={TabComponent()} />
  </PageHeader.Root>
);

export const TabBar = (args) => {
  return (
    <PageHeader.Root>
      <PageHeaderTabBar tabs={TabComponent()} />
    </PageHeader.Root>
  );
};

export const DirectExports = (args) => (
  <PageHeaderDirect {...args}>
    <PageHeaderBreadcrumbBar />
    <PageHeaderContent />
    <PageHeaderTabBar tabs={TabComponent()} />
  </PageHeaderDirect>
);
