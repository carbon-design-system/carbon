/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import {
  withKnobs,
  array,
  boolean,
  number,
  text,
} from '@storybook/addon-knobs';
import Pagination from './Pagination';

const props = () => ({
  disabled: boolean('Disable page inputs (disabled)', false),
  page: number('The current page (page)', 1),
  totalItems: number('Total number of items (totalItems)', 103),
  pagesUnknown: boolean('Total number of items unknown (pagesUnknown)', false),
  pageInputDisabled: boolean(
    'Disable page input (pageInputDisabled)',
    undefined
  ),
  pageSizeInputDisabled: boolean(
    'Disable page size input (pageSizeInputDisabled)',
    undefined
  ),
  backwardText: text(
    'The description for the backward icon (backwardText)',
    'Previous page'
  ),
  forwardText: text(
    'The description for the forward icon (forwardText)',
    'Next page'
  ),
  pageSize: number('Number of items per page (pageSize)', 10),
  pageSizes: array('Choices of `pageSize` (pageSizes)', [10, 20, 30, 40, 50]),
  itemsPerPageText: text(
    'Label for `pageSizes` select UI (itemsPerPageText)',
    'Items per page:'
  ),
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
    withKnobs,
    (story) => <div style={{ maxWidth: '800px' }}>{story()}</div>,
  ],
};

export const Default = (args) => <Pagination {...props()} {...args} />;

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

export const Playground = (args) => <Pagination {...args} />;

Playground.argTypes = {
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
    defaultValue: 'Previous page',
  },
  forwardText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Next page',
  },
  disabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: 'false',
  },
  isLastPage: {
    control: {
      type: 'boolean',
    },
    defaultValue: 'false',
  },
  itemsPerPageText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Items per page:',
  },
  page: {
    control: {
      type: 'number',
    },
    defaultValue: 1,
  },
  pageInputDisabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: 'false',
  },
  pageSize: {
    control: {
      type: 'number',
    },
    defaultValue: 10,
  },
  pageSizes: {
    control: {
      type: 'array',
    },
    defaultValue: [10, 20, 30, 40, 50],
  },
  pageNumberText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Page Number',
  },
  pagesUnknown: {
    control: {
      type: 'boolean',
    },
    defaultValue: 'false',
  },
  pageSizeInputDisabled: {
    control: {
      type: 'boolean',
    },
    defaultValue: 'false',
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  totalItems: {
    control: {
      type: 'number',
    },
    defaultValue: 103,
  },
};
