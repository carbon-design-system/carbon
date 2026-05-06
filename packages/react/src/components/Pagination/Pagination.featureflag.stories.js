/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Pagination from './Pagination';
import React from 'react';
import { WithFeatureFlags } from '../../../.storybook/templates/WithFeatureFlags';

export default {
  title: 'Components/Pagination/Feature Flag',
  component: Pagination,
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
  args: {
    size: 'md',
  },
  decorators: [
    (Story) => (
      <WithFeatureFlags>
        <div style={{ maxWidth: '800px' }}>
          <Story />
        </div>
      </WithFeatureFlags>
    ),
  ],
  parameters: {
    docs: {
      page: null,
    },
  },
  tags: ['!autodocs'],
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
  totalItems: 1000000,
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
    options: ['xs', 'sm', 'md', 'lg'],
    control: { type: 'select' },
  },
  totalItems: {
    control: {
      type: 'number',
    },
  },
};
