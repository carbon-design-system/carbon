/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton } from '../Breadcrumb';
import OverflowMenu from '../OverflowMenu';
import OverflowMenuItem from '../OverflowMenuItem';
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

const sharedArgTypes = {
  size: {
    options: ['sm', 'md'],
    control: { type: 'select' },
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

Default.argTypes = {
  ...sharedArgTypes,
};

export const BreadcrumbWithOverflowMenu = (args) => (
  <Breadcrumb noTrailingSlash {...args}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem data-floating-menu-container>
      <OverflowMenu align="bottom" aria-label="Overflow menu in a breadcrumb">
        <OverflowMenuItem itemText="Breadcrumb 3" />
        <OverflowMenuItem itemText="Breadcrumb 4" />
      </OverflowMenu>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
    <BreadcrumbItem isCurrentPage>Breadcrumb 6</BreadcrumbItem>
  </Breadcrumb>
);

BreadcrumbWithOverflowMenu.argTypes = {
  ...sharedArgTypes,
};

export const BreadcrumbWithOverflowMenuSizeSmall = (args) => (
  <Breadcrumb noTrailingSlash {...args}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem data-floating-menu-container>
      <OverflowMenu align="bottom" aria-label="Overflow menu in a breadcrumb">
        <OverflowMenuItem itemText="Breadcrumb 3" />
        <OverflowMenuItem itemText="Breadcrumb 4" />
      </OverflowMenu>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
    <BreadcrumbItem isCurrentPage>Breadcrumb 6</BreadcrumbItem>
  </Breadcrumb>
);

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

export const BreadcrumbWithOverflowVisualSnapshots = (args) => (
  <Breadcrumb noTrailingSlash {...args}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem data-floating-menu-container>
      <OverflowMenu align="bottom" aria-label="Overflow menu in a breadcrumb">
        <OverflowMenuItem itemText="Breadcrumb 3" />
        <OverflowMenuItem itemText="Breadcrumb 4" />
      </OverflowMenu>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 5</BreadcrumbItem>
    <BreadcrumbItem isCurrentPage>Breadcrumb 6</BreadcrumbItem>
  </Breadcrumb>
);

BreadcrumbWithOverflowVisualSnapshots.argTypes = {
  ...sharedArgTypes,
};

BreadcrumbWithOverflowVisualSnapshots.play = async ({ canvas, userEvent }) => {
  await userEvent.click(canvas.getByRole('button'));
};

BreadcrumbWithOverflowVisualSnapshots.tags = ['!dev', '!autodocs'];
