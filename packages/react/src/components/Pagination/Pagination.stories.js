/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Pagination from './Pagination';
import React from 'react';
import { action } from 'storybook/actions';
import mdx from './Pagination.mdx';

const props = () => ({
  disabled: false,
  page: 1,
  totalItems: 103,
  pagesUnknown: false,
  pageInputDisabled: undefined,
  pageSizeInputDisabled: undefined,
  backwardText: 'Previous',
  forwardText: 'Next',
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50],
  itemsPerPageText: 'Items per page:',
  onChange: action('onChange'),
});

export default {
  title: 'Components/Pagination',
  component: Pagination,
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
  args: {
    size: 'md',
  },
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
  return <Pagination pageSizes={[10, 20, 30, 40, 50]} {...args} />;
};

Default.args = {
  backwardText: 'Previous',
  forwardText: 'Next',
  disabled: false,
  isLastPage: false,
  itemsPerPageText: 'Items per page:',
  page: 1,
  pageInputDisabled: false,
  pageSize: 10,
  pageSizes: [10, 20, 30, 40, 50],
  pageNumberText: 'Page Number',
  pagesUnknown: false,
  pageSizeInputDisabled: false,
  totalItems: 103,
};

Default.argTypes = {
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
    control: {
      type: 'text',
    },
  },
  forwardText: {
    control: {
      type: 'text',
    },
  },
  disabled: {
    control: {
      type: 'boolean',
    },
  },
  isLastPage: {
    control: {
      type: 'boolean',
    },
  },
  itemsPerPageText: {
    control: {
      type: 'text',
    },
  },
  page: {
    control: {
      type: 'number',
    },
  },
  pageInputDisabled: {
    control: {
      type: 'boolean',
    },
  },
  pageSize: {
    control: {
      type: 'number',
    },
  },
  pageSizes: {
    control: {
      type: 'array',
    },
  },
  pageNumberText: {
    control: {
      type: 'text',
    },
  },
  pagesUnknown: {
    control: {
      type: 'boolean',
    },
  },
  pageSizeInputDisabled: {
    control: {
      type: 'boolean',
    },
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  totalItems: {
    control: {
      type: 'number',
    },
  },
};

export const MultiplePaginationComponents = (args) => {
  return (
    <div>
      <Pagination {...props()} {...args} />
      <Pagination {...props()} {...args} />
    </div>
  );
};

MultiplePaginationComponents.storyName = 'Multiple Pagination components';

export const PaginationWithCustomPageSizesLabel = (args) => {
  return (
    <div>
      <Pagination
        {...props()}
        pageSizes={[
          { text: 'Ten', value: 10 },
          { text: 'Twenty', value: 20 },
          { text: 'Thirty', value: 30 },
          { text: 'Forty', value: 40 },
          { text: 'Fifty', value: 50 },
        ]}
        {...args}
      />
    </div>
  );
};

PaginationWithCustomPageSizesLabel.storyName =
  'Pagination with custom page sizes label';

export const PaginationUnknownPages = (args) => {
  return (
    <div>
      <Pagination
        {...props()}
        pagesUnknown={true}
        totalItems={undefined}
        page={1}
        {...args}
      />
    </div>
  );
};

PaginationUnknownPages.storyName = 'Unknown pages and items';
