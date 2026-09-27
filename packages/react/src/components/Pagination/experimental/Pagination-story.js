/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  preview_PageSelector as PageSelector,
  preview_Pagination as Pagination,
} from '../../..';

const defaultArgs = {
  backwardText: 'Previous page',
  disabled: false,
  forwardText: 'Next page',
  initialPage: 1,
  itemsPerPageText: 'Items per page:',
  pageSize: 10,
  pageSizes: [10, 20, 30],
  pagesUnknown: false,
  totalItems: 350,
};

export default {
  title: 'Deprecated/preview_Pagination',
  component: Pagination,
  subcomponents: {
    PageSelector,
  },
  argTypes: {
    backwardText: {
      control: {
        type: 'text',
      },
    },
    children: {
      control: false,
    },
    className: {
      control: false,
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    forwardText: {
      control: {
        type: 'text',
      },
    },
    id: {
      control: false,
    },
    initialPage: {
      control: {
        type: 'number',
      },
    },
    itemRangeText: {
      control: false,
    },
    itemsPerPageText: {
      control: {
        type: 'text',
      },
    },
    itemText: {
      control: false,
    },
    onChange: {
      action: 'onChange',
    },
    pageRangeText: {
      control: false,
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
    pagesUnknown: {
      control: {
        type: 'boolean',
      },
    },
    pageText: {
      control: false,
    },
    totalItems: {
      control: {
        type: 'number',
      },
    },
  },
  decorators: [(story) => <div style={{ width: '800px' }}>{story()}</div>],
};

export const WithAPageSelector = (args) => (
  <Pagination key={`${args.initialPage}-${args.pageSize}`} {...args}>
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
WithAPageSelector.args = {
  ...defaultArgs,
};

export const WithNoSizerChildInputOrChildSelector = (args) => (
  <Pagination key={`${args.initialPage}-${args.pageSize}`} {...args} />
);

WithNoSizerChildInputOrChildSelector.storyName =
  'with no sizer, child input, or child selector';
WithNoSizerChildInputOrChildSelector.args = {
  ...defaultArgs,
  pageSizes: undefined,
};
WithNoSizerChildInputOrChildSelector.parameters = {
  controls: {
    exclude: ['pageSizes'],
  },
};

export const Playground = (args) => (
  <Pagination key={`${args.initialPage}-${args.pageSize}`} {...args} />
);

Playground.args = {
  ...defaultArgs,
};
