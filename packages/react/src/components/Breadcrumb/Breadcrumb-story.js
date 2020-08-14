/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton } from '../Breadcrumb';
import mdx from './Breadcrumb.mdx';

export default {
  title: 'Breadcrumb',
  component: Breadcrumb,
  subcomponents: {
    BreadcrumbItem,
    BreadcrumbSkeleton,
  },
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const breadcrumb = () => (
  <Breadcrumb>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
  </Breadcrumb>
);

export const skeleton = () => <BreadcrumbSkeleton />;

const props = () => ({
  className: 'some-class',
  noTrailingSlash: boolean('No trailing slash (noTrailingSlash)', false),
  isCurrentPage: boolean('Is current page (isCurrentPage)', false),
  onClick: action('onClick'),
});

export const playground = () => (
  <Breadcrumb {...props()}>
    <BreadcrumbItem>
      <a href="/#">Breadcrumb 1</a>
    </BreadcrumbItem>
    <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
    <BreadcrumbItem href="#" {...props()}>
      Breadcrumb 3
    </BreadcrumbItem>
  </Breadcrumb>
);
