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
} from '../PageHeader';
import { Dropdown } from '../Dropdown';
import { Tag } from '../Tag';
import { ContentSwitcher } from '../ContentSwitcher';
import { IconSwitch } from '../Switch';
import { Button } from '../Button';

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
  component: PageHeaderContent,
  subcomponents: {
    PageHeaderBreadcrumbBar,
    PageHeaderContent,
    PageHeaderTabBar,
  },
  // uncomment includeStories before merging so the stories aren't visible in prod
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

export const Default = (args) => (
  <PageHeader.Root {...args}>
    <PageHeader.BreadcrumbBar />
    <PageHeader.Content />
    <PageHeader.TabBar />
  </PageHeader.Root>
);

export const BreadcrumbBar = (args) => (
  <PageHeader.Root>
    <PageHeader.BreadcrumbBar {...args} />
  </PageHeader.Root>
);

export const Content = (args) => (
  <PageHeader.Root>
    <PageHeader.Content
      title="hello"
      subTitle="subTitle"
      icon={<Bee size={32} />}
      contextualActions={
        <>
          <Dropdown
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
      Neque massa fames auctor maecenas leo. Mollis vehicula per, est justo.
      Massa elementum class enim malesuada lacinia hendrerit enim erat
      pellentesque. Sapien arcu lobortis est erat arcu nibh vehicula congue.
      Nisi molestie primis lorem nascetur sem metus mattis etiam scelerisque.
    </PageHeader.Content>
  </PageHeader.Root>
);

// Content.args = {
//   // flipped: document?.dir === 'rtl',
//   // focusTrap: false,
//   // open: false,
// };

// Content.argTypes = {
//   title: {
//     control: 'string'
//   }
// }

export const TabBar = (args) => (
  <PageHeader.Root>
    <PageHeader.TabBar {...args} />
  </PageHeader.Root>
);

export const DirectExports = (args) => (
  <PageHeaderDirect {...args}>
    <PageHeaderBreadcrumbBar />
    <PageHeaderContent />
    <PageHeaderTabBar />
  </PageHeaderDirect>
);
