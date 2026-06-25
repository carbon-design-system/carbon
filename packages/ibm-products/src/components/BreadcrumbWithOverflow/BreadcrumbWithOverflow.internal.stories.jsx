/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import { BreadcrumbWithOverflow } from '.';
import { DisplayBox } from '../../global/js/utils/DisplayBox';
import styles from './_storybook-styles.scss?inline';

const lastBreadcrumbs = [
  'A slightly longer length title',
  'Breadcrumb 5 is a longer breadcrumb it could go on for much longer than expected',
];

export default {
  title: 'Internal/BreadcrumbWithOverflow',
  component: BreadcrumbWithOverflow,
  tags: ['autodocs'],
  argTypes: {
    containerWidth: {
      control: { type: 'range', min: 20, max: 800, step: 10 },
    },
    lastBreadcrumb: {
      control: {
        type: 'select',
      },
      options: lastBreadcrumbs,
    },
    lastBreadcrumbIsCurrent: { control: { type: 'boolean' } },
  },
  parameters: {
    styles,
  },
  decorators: [(story) => <DisplayBox>{story()}</DisplayBox>],
};

const breadcrumbItems = [
  {
    key: '1',
    id: 'id-1',
    href: '/#',
    onClick: (ev) => {
      ev.preventDefault();
      action('Breadcrumb 1 click')();
    },
    label: 'Breadcrumb 1',
  },
  {
    key: '2',
    id: 'id-2',
    href: '/#',
    onClick: (ev) => {
      ev.preventDefault();
      action('Breadcrumb 2 click')();
    },
    label: 'Breadcrumb 2',
  },
  {
    key: '3',
    id: 'id-3',
    href: '/#',
    onClick: (ev) => {
      ev.preventDefault();
      action('Breadcrumb 3 click')();
    },
    label: 'Breadcrumb 3',
  },
  {
    key: '4',
    id: 'id-4',
    href: '/#',
    onClick: (ev) => {
      ev.preventDefault();
      action('Breadcrumb 4 click')();
    },
    label: <span>Breadcrumb 4</span>,
    title: 'Breadcrumb 4 title',
  },
];

const Template = (argsIn) => {
  const {
    breadcrumbs,
    containerWidth,
    lastBreadcrumb,
    lastBreadcrumbIsCurrent,
    shortTitle,
    ...args
  } = {
    ...argsIn,
  };

  const isCurrentPage = !!lastBreadcrumbIsCurrent;

  const breadcrumbsWithLastItem = [...breadcrumbs].concat({
    key: 'last one',
    href: isCurrentPage ? null : '/#',
    isCurrentPage: isCurrentPage,
    label: lastBreadcrumb, // wrapping this with a span causes error - "Cannot convert a symbol value to a string" - perhaps ? https://github.com/storybookjs/storybook/issues/11554
    title: lastBreadcrumb,
    shortTitle,
  });

  return (
    <div style={{ width: containerWidth }}>
      <BreadcrumbWithOverflow {...args} breadcrumbs={breadcrumbsWithLastItem} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  breadcrumbs: breadcrumbItems,
  containerWidth: 500,
  overflowAriaLabel: 'Open and close additional breadcrumb item list.',
  lastBreadcrumb: lastBreadcrumbs[0],
};

export const LongTitleWithIconAndShortTitle = Template.bind({});
LongTitleWithIconAndShortTitle.args = {
  breadcrumbs: breadcrumbItems,
  containerWidth: 500,
  overflowAriaLabel: 'Open and close additional breadcrumb item list.',
  lastBreadcrumb: lastBreadcrumbs[1],
  shortTitle: 'See, shorter',
};
