/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Breadcrumb, BreadcrumbItem, BreadcrumbSkeleton } from '../Breadcrumb';

const props = () => ({
  className: 'some-class',
  noTrailingSlash: boolean('No trailing slash (noTrailingSlash)', false),
  onClick: action('onClick'),
});

storiesOf('Breadcrumb', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    () => (
      <Breadcrumb {...props()}>
        <BreadcrumbItem>
          <a href="/#">Breadcrumb 1</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
      </Breadcrumb>
    ),
    {
      info: {
        text: `
          Breadcrumb enables users to quickly see their location within a path of navigation and move up to a parent level if desired.
        `,
      },
    }
  )
  .add(
    'no trailing slash',
    () => (
      <Breadcrumb {...props()} noTrailingSlash>
        <BreadcrumbItem>
          <a href="/#">Breadcrumb 1</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 3</BreadcrumbItem>
      </Breadcrumb>
    ),
    {
      info: {
        text:
          'You can choose not to render a trailing slash with the `noTrailingSlash` prop',
      },
    }
  )
  .add('skeleton', () => <BreadcrumbSkeleton />, {
    info: {
      text: `
          Placeholder skeleton state to use when content is loading.
          `,
    },
  })
  .add(
    'current page',
    () => (
      <Breadcrumb {...props()}>
        <BreadcrumbItem>
          <a href="/#">Breadcrumb 1</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="#" isCurrentPage>
          Breadcrumb 3
        </BreadcrumbItem>
      </Breadcrumb>
    ),
    {
      info: {
        text:
          'You can specify a BreadcrumbItem component as the current page with the `isCurrentPage` prop',
      },
    }
  )
  .add(
    'current page with aria-current',
    () => (
      <Breadcrumb {...props()}>
        <BreadcrumbItem>
          <a href="/#">Breadcrumb 1</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="#">Breadcrumb 2</BreadcrumbItem>
        <BreadcrumbItem href="#" aria-current="page">
          Breadcrumb 3
        </BreadcrumbItem>
      </Breadcrumb>
    ),
    {
      info: {
        text:
          'You can specify a BreadcrumbItem component as the current page with the `aria-current` prop by specifying `aria-current="page"`',
      },
    }
  );
