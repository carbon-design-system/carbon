/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import {
  array,
  boolean,
  number,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import {
  unstable_PageSelector as PageSelector,
  unstable_Pagination as Pagination,
} from '../../..';

const props = () => ({
  disabled: boolean('Disable backward/forward buttons (disabled)', false),
  pagesUnknown: boolean('Total number of items unknown (pagesUnknown)', false),
  backwardText: text(
    'The description for the backward icon (backwardText)',
    'Previous page'
  ),
  forwardText: text(
    'The description for the forward icon (forwardText)',
    'Next page'
  ),
  pageSize: number('Number of items per page (pageSize)', 10),
  itemsPerPageText: text(
    'Label for `pageSizes` select UI (itemsPerPageText)',
    'Items per page:'
  ),
  onChange: action('onChange'),
});

export default {
  title: 'Experimental/unstable_Pagination',
  component: Pagination,
  subcomponents: {
    PageSelector,
  },
  decorators: [
    withKnobs,
    (story) => <div style={{ width: '800px' }}>{story()}</div>,
  ],
};

export const WithAPageSelector = () => (
  <Pagination
    {...props()}
    totalItems={350}
    pageSizes={array('Choices of `pageSize` (pageSizes)', [10, 20, 30])}>
    {({ currentPage, onSetPage, totalPages }) => (
      <PageSelector
        currentPage={currentPage}
        id="select-1"
        onChange={(event) => onSetPage(event.target.value)}
        totalPages={totalPages}
      />
    )}
  </Pagination>
);

WithAPageSelector.storyName = 'with a page selector';

export const WithNoSizerChildInputOrChildSelector = () => (
  <Pagination {...props()} totalItems={350} />
);

WithNoSizerChildInputOrChildSelector.storyName =
  'with no sizer, child input, or child selector';

export const Playground = (args) => <Pagination {...args} />;

Playground.argTypes = {
  className: {
    control: false,
  },
  children: {
    control: false,
  },
  id: {
    control: false,
  },
  itemText: {
    control: false,
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
  itemRangeText: {
    control: false,
  },
  itemsPerPageText: {
    control: {
      type: 'text',
    },
    defaultValue: 'Items per page:',
  },
  initialPage: {
    control: {
      type: 'number',
    },
    defaultValue: 1,
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
  pagesUnknown: {
    control: {
      type: 'boolean',
    },
    defaultValue: 'false',
  },
  totalItems: {
    control: {
      type: 'number',
    },
    defaultValue: 350,
  },
};
