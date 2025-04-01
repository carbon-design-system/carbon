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
import mdx from './PageHeader.mdx';

export default {
  title: 'Patterns/unstable__PageHeader',
  component: PageHeader,
  subcomponents: {
    PageHeaderBreadcrumbBar,
    PageHeaderContent,
    PageHeaderTabBar,
  },
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
    <PageHeader.Content {...args} />
  </PageHeader.Root>
);

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
