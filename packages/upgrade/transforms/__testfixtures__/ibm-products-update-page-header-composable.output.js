/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { preview__PageHeader as PageHeader } from '@carbon/ibm-products';
import { Button, Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { Lightning, Settings } from '@carbon/react/icons';

// Test 1: Basic PageHeader with title only
export const BasicPageHeader = () => (
  <PageHeader><PageHeader.Content title="Page title" /></PageHeader>
);

// Test 2: PageHeader with title and subtitle
export const PageHeaderWithSubtitle = () => (
  <PageHeader><PageHeader.Content title="Page title"><PageHeader.ContentText subtitle="Optional subtitle" /></PageHeader.Content></PageHeader>
);

// Test 3: PageHeader with title, subtitle, and children
export const PageHeaderWithChildren = () => (
  <PageHeader><PageHeader.Content title="Page title"><PageHeader.ContentText subtitle="Optional subtitle" />
      <p>Additional content in the page header</p>
    </PageHeader.Content></PageHeader>
);

// Test 4: PageHeader with breadcrumbs
export const PageHeaderWithBreadcrumbs = () => (
  <PageHeader><PageHeader.BreadcrumbBar
      breadcrumbs={[
        { href: '#', key: 'breadcrumb-1', label: 'Home' },
        { href: '#', key: 'breadcrumb-2', label: 'Level 2' },
      ]}
      breadcrumbOverflowAriaLabel="Open breadcrumb menu" /><PageHeader.Content title="Page title" /></PageHeader>
);

// Test 5: PageHeader with pageActions
export const PageHeaderWithPageActions = () => (
  <PageHeader pageActionsOverflowLabel="More actions"><PageHeader.Content
      title="Page title"
      pageActions={[
        {
          key: 'action-1',
          label: 'Primary action',
          kind: 'primary',
          onClick: () => console.log('Primary action'),
        },
        {
          key: 'action-2',
          label: 'Secondary action',
          kind: 'secondary',
          onClick: () => console.log('Secondary action'),
        },
      ]} /></PageHeader>
);

// Test 6: PageHeader with actionBarItems
export const PageHeaderWithActionBar = () => (
  <PageHeader actionBarOverflowAriaLabel="Action bar overflow"><PageHeader.Content
      title="Page title"
      contextualActions={[
        {
          key: 'action-1',
          renderIcon: Lightning,
          iconDescription: 'Lightning',
          onClick: () => console.log('Lightning'),
        },
        {
          key: 'action-2',
          renderIcon: Settings,
          iconDescription: 'Settings',
          onClick: () => console.log('Settings'),
        },
      ]} /></PageHeader>
);

// Test 7: PageHeader with navigation (Tabs)
export const PageHeaderWithNavigation = () => (
  <PageHeader><PageHeader.Content title="Page title" /><PageHeader.TabBar><Tabs>
        <TabList aria-label="Tab navigation">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Content 1</TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </Tabs></PageHeader.TabBar></PageHeader>
);

// Test 8: PageHeader with tags
export const PageHeaderWithTags = () => (
  <PageHeader><PageHeader.Content title="Page title" /><PageHeader.TagOverflow
      tags={[
        { label: 'Tag 1', key: 'tag-1' },
        { label: 'Tag 2', key: 'tag-2' },
        { label: 'Tag 3', key: 'tag-3' },
      ]} /></PageHeader>
);

// Test 9: Complete PageHeader with all features
export const CompletePageHeader = () => (
  <PageHeader
    actionBarOverflowAriaLabel="Action bar overflow"
    pageActionsOverflowLabel="More actions"><PageHeader.BreadcrumbBar
      breadcrumbs={[
        { href: '#', key: 'breadcrumb-1', label: 'Home' },
        { href: '#', key: 'breadcrumb-2', label: 'Level 2' },
      ]}
      breadcrumbOverflowAriaLabel="Open breadcrumb menu" /><PageHeader.Content
      title="Complete page title"
      pageActions={[
        {
          key: 'action-1',
          label: 'Primary action',
          kind: 'primary',
          onClick: () => console.log('Primary action'),
        },
      ]}
      contextualActions={[
        {
          key: 'action-1',
          renderIcon: Lightning,
          iconDescription: 'Lightning',
          onClick: () => console.log('Lightning'),
        },
      ]}><PageHeader.ContentText subtitle="With all the features" />
      <p>Page content goes here</p>
    </PageHeader.Content><PageHeader.TabBar><Tabs>
        <TabList aria-label="Tab navigation">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
      </Tabs></PageHeader.TabBar><PageHeader.TagOverflow
      tags={[
        { label: 'Tag 1', key: 'tag-1' },
        { label: 'Tag 2', key: 'tag-2' },
      ]} /></PageHeader>
);

// Test 10: PageHeader with title as object
export const PageHeaderWithTitleObject = () => (
  <PageHeader><PageHeader.Content title={'Page title'} renderIcon={Lightning} /></PageHeader>
);

// Test 11: PageHeader with deprecated props (should be ignored)
export const PageHeaderWithDeprecatedProps = () => (
  <PageHeader><PageHeader.Content title="Page title" /></PageHeader>
);
