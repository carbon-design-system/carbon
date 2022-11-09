/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import Pagination from './Pagination';

const props = () => ({
  disabled: false,
  page: 1,
  totalItems: 103,
  pagesUnknown: false,
  pageInputDisabled: undefined,
  pageSizeInputDisabled: undefined,
  backwardText: 'Previous page',
  forwardText: 'Next page',
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50],
  itemsPerPageText: 'Items per page:',
  onChange: action('onChange'),
});

export default {
  title: 'Components/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = () => <Pagination {...props()} />;

export const MultiplePaginationComponents = () => {
  return (
    <div>
      <Pagination {...props()} />
      <Pagination {...props()} />
    </div>
  );
};

MultiplePaginationComponents.storyName = 'Multiple Pagination components';

export const PaginationWithCustomPageSizesLabel = () => {
  return (
    <div>
      <Pagination
        pageSizes={[
          { text: 'Ten', value: 10 },
          { text: 'Twenty', value: 20 },
          { text: 'Thirty', value: 30 },
          { text: 'Forty', value: 40 },
          { text: 'Fifty', value: 50 },
        ]}
        {...props()}
      />
    </div>
  );
};

export const Playground = (args) => {
  return (
    <div style={{ maxWidth: '800px' }}>
      <Pagination onChange={action('onChange')} {...args} />
    </div>
  );
};

PaginationWithCustomPageSizesLabel.storyName =
  'Pagination with custom page sizes label';

Playground.argTypes = {
  backwardText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Previous page',
  },
  className: {
    table: {
      disable: true,
    },
  },
  disabled: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  forwardText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Next page',
  },
  id: {
    table: {
      disable: true,
    },
  },
  isLastPage: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  itemsPerPageText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Items per page:',
  },
  itemRangeText: {
    table: {
      disable: true,
    },
  },
  itemText: {
    table: {
      disable: true,
    },
  },
  onChange: {
    table: {
      disable: true,
    },
  },
  page: {
    control: {
      type: 'number',
      min: 1,
      max: 1000,
      step: 1,
    },
    defaultValue: '1',
  },
  pageInputDisabled: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  pageNumberText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Page Number',
  },
  pageRangeText: {
    table: {
      disable: true,
    },
  },
  pageSize: {
    control: {
      type: 'number',
      min: 0,
      max: 50,
      step: 10,
    },
    defaultValue: '10',
  },
  pageSizeInputDisabled: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  pageSizes: {
    control: {
      type: 'object',
    },
    defaultValue: [10, 20, 30, 40, 50],
  },
  pageText: {
    table: {
      disable: true,
    },
  },
  pagesUnknown: {
    control: { type: 'boolean' },
    defaultValue: false,
  },
  size: {
    control: {
      type: 'select',
    },
    defaultValue: 'md',
    options: ['sm', 'md', 'lg'],
  },
  totalItems: {
    control: {
      type: 'number',
      min: 1,
      max: 1000,
      step: 1,
    },
    defaultValue: '100',
  },
};
