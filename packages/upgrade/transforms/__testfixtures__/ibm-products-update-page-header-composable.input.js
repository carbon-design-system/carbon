/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { PageHeader } from '@carbon/ibm-products';
import { Button, Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { Lightning, Settings } from '@carbon/react/icons';

// Test 1: Basic PageHeader with title only
export const BasicPageHeader = () => <PageHeader title="Page title" />;

// Test 2: PageHeader with title and subtitle
export const PageHeaderWithSubtitle = () => (
  <PageHeader title="Page title" subtitle="Optional subtitle" />
);

// Test 3: PageHeader with title, subtitle, and children
export const PageHeaderWithChildren = () => (
  <PageHeader title="Page title" subtitle="Optional subtitle">
    <p>Additional content in the page header</p>
  </PageHeader>
);

// Test 4: PageHeader with breadcrumbs
export const PageHeaderWithBreadcrumbs = () => (
  <PageHeader
    title="Page title"
    breadcrumbs={[
      { href: '#', key: 'breadcrumb-1', label: 'Home' },
      { href: '#', key: 'breadcrumb-2', label: 'Level 2' },
    ]}
    breadcrumbOverflowAriaLabel="Open breadcrumb menu"
  />
);

// Test 5: PageHeader with pageActions
export const PageHeaderWithPageActions = () => (
  <PageHeader
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
    ]}
    pageActionsOverflowLabel="More actions"
  />
);

// Test 6: PageHeader with actionBarItems
export const PageHeaderWithActionBar = () => (
  <PageHeader
    title="Page title"
    actionBarItems={[
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
    ]}
    actionBarOverflowAriaLabel="Action bar overflow"
  />
);

// Test 7: PageHeader with navigation (Tabs)
export const PageHeaderWithNavigation = () => (
  <PageHeader
    title="Page title"
    navigation={
      <Tabs>
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
      </Tabs>
    }
  />
);

// Test 8: PageHeader with tags
export const PageHeaderWithTags = () => (
  <PageHeader
    title="Page title"
    tags={[
      { label: 'Tag 1', key: 'tag-1' },
      { label: 'Tag 2', key: 'tag-2' },
      { label: 'Tag 3', key: 'tag-3' },
    ]}
  />
);

// Test 9: Complete PageHeader with all features
export const CompletePageHeader = () => (
  <PageHeader
    title="Complete page title"
    subtitle="With all the features"
    breadcrumbs={[
      { href: '#', key: 'breadcrumb-1', label: 'Home' },
      { href: '#', key: 'breadcrumb-2', label: 'Level 2' },
    ]}
    breadcrumbOverflowAriaLabel="Open breadcrumb menu"
    actionBarItems={[
      {
        key: 'action-1',
        renderIcon: Lightning,
        iconDescription: 'Lightning',
        onClick: () => console.log('Lightning'),
      },
    ]}
    actionBarOverflowAriaLabel="Action bar overflow"
    pageActions={[
      {
        key: 'action-1',
        label: 'Primary action',
        kind: 'primary',
        onClick: () => console.log('Primary action'),
      },
    ]}
    pageActionsOverflowLabel="More actions"
    navigation={
      <Tabs>
        <TabList aria-label="Tab navigation">
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
        </TabList>
      </Tabs>
    }
    tags={[
      { label: 'Tag 1', key: 'tag-1' },
      { label: 'Tag 2', key: 'tag-2' },
    ]}>
    <p>Page content goes here</p>
  </PageHeader>
);

// Test 10: PageHeader with title as object
export const PageHeaderWithTitleObject = () => (
  <PageHeader
    title={{
      text: 'Page title',
      icon: Lightning,
    }}
  />
);

// Test 11: PageHeader with deprecated props (should be ignored)
export const PageHeaderWithDeprecatedProps = () => (
  <PageHeader
    title="Page title"
    collapseHeader={false}
    hasCollapseHeaderToggle={true}
    collapseHeaderIconDescription="Collapse"
    expandHeaderIconDescription="Expand"
    enableBreadcrumbScroll={true}
    withoutBackground={false}
  />
);
