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
  select,
  text,
} from '@storybook/addon-knobs';
import Pagination from '../Pagination';
import mdx from './Pagination.mdx';

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const props = () => ({
  disabled: boolean('Disable page inputs (disabled)', false),
  size: select('Size (size)', sizes, undefined) || undefined,
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
  decorators: [
    withKnobs,
    (story) => <div style={{ maxWidth: '800px' }}>{story()}</div>,
  ],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const _Pagination = () => <Pagination {...props()} />;

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
        {...props()}
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
