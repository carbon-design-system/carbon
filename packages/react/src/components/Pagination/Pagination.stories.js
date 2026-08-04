/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Pagination from './Pagination';
import React from 'react';
import { action } from 'storybook/actions';
import mdx from './Pagination.mdx';
import userEvent from '@testing-library/user-event';

const args = {
  backwardText: 'Previous',
  backwardTextTooltipPosition: 'top',
  disabled: false,
  forwardText: 'Next',
  forwardTextTooltipPosition: 'top',
  isLastPage: false,
  itemsPerPageText: 'Items per page:',
  page: 1,
  pageInputDisabled: false,
  pageNumberText: 'Page Number',
  pageSize: 10,
  pageSizeInputDisabled: false,
  pageSizes: [10, 20, 30, 40, 50],
  pagesUnknown: false,
  size: 'md',
  totalItems: 103,
  onChange: action('onChange'),
};

const argTypes = {
  className: {
    control: false,
  },
  id: {
    control: false,
  },
  itemText: {
    control: false,
  },
  backwardText: {
    control: { type: 'text' },
  },
  backwardTextTooltipPosition: {
    options: ['top', 'right', 'bottom', 'left'],
    control: { type: 'select' },
  },
  forwardText: {
    control: { type: 'text' },
  },
  forwardTextTooltipPosition: {
    options: ['top', 'right', 'bottom', 'left'],
    control: { type: 'select' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  isLastPage: {
    control: { type: 'boolean' },
  },
  itemsPerPageText: {
    control: { type: 'text' },
  },
  onChange: {
    action: 'onChange',
  },
  page: {
    control: { type: 'number' },
  },
  pageInputDisabled: {
    control: { type: 'boolean' },
  },
  pageSize: {
    control: { type: 'number' },
  },
  pageSizes: {
    control: { type: 'array' },
  },
  pageNumberText: {
    control: { type: 'text' },
  },
  pagesUnknown: {
    control: { type: 'boolean' },
  },
  pageSizeInputDisabled: {
    control: { type: 'boolean' },
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  totalItems: {
    control: { type: 'number' },
  },
};

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes,
  args,
  decorators: [
    (story) => (
      <div style={{ maxWidth: '800px', marginTop: '15px' }}>{story()}</div>
    ),
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  return <Pagination {...args} />;
};

export const TooltipHover = {
  tags: ['!autodocs', '!dev'],
  parameters: {
    chromatic: { delay: 100 },
  },
  play: async ({ canvasElement }) => {
    const nextButton = canvasElement.querySelector(
      '.cds--pagination__button--forward'
    );
    await userEvent.hover(nextButton);
  },
};

export const MultiplePaginationComponents = (args) => {
  return (
    <div>
      <Pagination {...args} />
      <Pagination {...args} />
    </div>
  );
};

MultiplePaginationComponents.storyName = 'Multiple Pagination components';

export const PaginationWithCustomPageSizesLabel = (args) => {
  return (
    <div>
      <Pagination
        {...args}
        pageSizes={[
          { text: 'Ten', value: 10 },
          { text: 'Twenty', value: 20 },
          { text: 'Thirty', value: 30 },
          { text: 'Forty', value: 40 },
          { text: 'Fifty', value: 50 },
        ]}
      />
    </div>
  );
};

PaginationWithCustomPageSizesLabel.storyName =
  'Pagination with custom page sizes label';
PaginationWithCustomPageSizesLabel.parameters = {
  controls: {
    exclude: ['pageSizes'],
  },
};

export const PaginationUnknownPages = (args) => {
  const { pageInputDisabled, pagesUnknown, totalItems, ...rest } = args ?? {};

  return (
    <div>
      <Pagination {...rest} pagesUnknown totalItems={undefined} />
    </div>
  );
};

PaginationUnknownPages.storyName = 'Unknown pages and items';
PaginationUnknownPages.parameters = {
  controls: {
    exclude: ['pageInputDisabled', 'pagesUnknown', 'totalItems'],
  },
};
