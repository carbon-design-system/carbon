/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton } from '../Breadcrumb';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
import { MenuItem } from '../Menu';
import { useFeatureFlag } from '../FeatureFlags';
import mdx from './Breadcrumb.mdx';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbItem,
    BreadcrumbSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgs = {
  noTrailingSlash: false,
  'aria-label': 'Breadcrumb container',
  size: 'md',
};

const sharedArgTypes = {
  className: {
    control: false,
  },
  children: {
    control: false,
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md'],
  },
  noTrailingSlash: {
    control: { type: 'boolean' },
    description: 'Removes the trailing slash from the breadcrumb',
  },
  'aria-label': {
    control: { type: 'text' },
    description: 'Specifies the label for the breadcrumb container',
  },
};

export const Default = (args) => (
  <Breadcrumb {...args}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 4</BreadcrumbItem>
  </Breadcrumb>
);

Default.args = { ...sharedArgs };

Default.argTypes = {
  ...sharedArgTypes,
};

const getBreadcrumbOverflowMenuProps = (enableV12OverflowMenu) =>
  enableV12OverflowMenu
    ? {
        label: 'Overflow menu in a breadcrumb',
        tooltipAlignment: 'bottom',
      }
    : {
        align: 'bottom',
        'aria-label': 'Overflow menu in a breadcrumb',
      };

const renderBreadcrumbOverflowMenuItems = (enableV12OverflowMenu) =>
  enableV12OverflowMenu ? (
    <>
      <MenuItem label="Breadcrumb 3" />
      <MenuItem label="Breadcrumb 4" />
    </>
  ) : (
    <>
      <OverflowMenuItem itemText="Breadcrumb 3" />
      <OverflowMenuItem itemText="Breadcrumb 4" />
    </>
  );

export const BreadcrumbWithOverflowMenu = (args) => {
  const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

  return (
    <Breadcrumb {...args} noTrailingSlash>
      <BreadcrumbItem>
        <a href="/#">Breadcrumb 1</a>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      <BreadcrumbItem data-floating-menu-container>
        <OverflowMenu
          {...getBreadcrumbOverflowMenuProps(enableV12OverflowMenu)}>
          {renderBreadcrumbOverflowMenuItems(enableV12OverflowMenu)}
        </OverflowMenu>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>Breadcrumb 6</BreadcrumbItem>
    </Breadcrumb>
  );
};

BreadcrumbWithOverflowMenu.args = { ...sharedArgs };

BreadcrumbWithOverflowMenu.argTypes = {
  ...sharedArgTypes,
};

export const BreadcrumbWithOverflowMenuSizeSmall = (args) => {
  const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

  return (
    <Breadcrumb {...args} noTrailingSlash>
      <BreadcrumbItem>
        <a href="/#">Breadcrumb 1</a>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      <BreadcrumbItem data-floating-menu-container>
        <OverflowMenu
          {...getBreadcrumbOverflowMenuProps(enableV12OverflowMenu)}>
          {renderBreadcrumbOverflowMenuItems(enableV12OverflowMenu)}
        </OverflowMenu>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>Breadcrumb 6</BreadcrumbItem>
    </Breadcrumb>
  );
};

BreadcrumbWithOverflowMenuSizeSmall.argTypes = {
  ...sharedArgTypes,
};

/*
 * This story will:
 * - Be excluded from the docs page
 * - Removed from the sidebar navigation
 * - Still be a tested variant
 */
BreadcrumbWithOverflowMenuSizeSmall.tags = ['!dev', '!autodocs'];

BreadcrumbWithOverflowMenuSizeSmall.args = {
  size: 'sm',
};

export const Skeleton = (args) => {
  return <BreadcrumbSkeleton {...args} />;
};

Skeleton.args = {
  items: 3,
};

Skeleton.parameters = {
  controls: { exclude: ['aria-label'] },
};

Skeleton.argTypes = {
  ...sharedArgTypes,
  items: {
    description: 'Specify the number of items',
    table: {
      defaultValue: { summary: 3 },
    },
  },
};

export const BreadcrumbWithOverflowVisualSnapshots = (args) => {
  const enableV12OverflowMenu = useFeatureFlag('enable-v12-overflowmenu');

  return (
    <Breadcrumb {...args} noTrailingSlash>
      <BreadcrumbItem>
        <a href="/#">Breadcrumb 1</a>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
      <BreadcrumbItem data-floating-menu-container>
        <OverflowMenu
          {...getBreadcrumbOverflowMenuProps(enableV12OverflowMenu)}>
          {renderBreadcrumbOverflowMenuItems(enableV12OverflowMenu)}
        </OverflowMenu>
      </BreadcrumbItem>
      <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>Breadcrumb 6</BreadcrumbItem>
    </Breadcrumb>
  );
};

BreadcrumbWithOverflowVisualSnapshots.argTypes = {
  ...sharedArgTypes,
};

BreadcrumbWithOverflowVisualSnapshots.play = async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole('button'));
};

BreadcrumbWithOverflowVisualSnapshots.tags = ['!dev', '!autodocs'];
