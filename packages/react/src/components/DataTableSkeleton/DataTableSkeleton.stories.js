/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import DataTableSkeleton from './DataTableSkeleton';
import { headers } from '../DataTable/stories/shared';

const props = () => ({
  zebra: false,
  compact: false,
  showHeader: true,
  showToolbar: true,
});

export default {
  title: 'Components/DataTable/Skeleton',
  component: DataTableSkeleton,
};

export const Skeleton = () => {
  const { ...rest } = props();
  return (
    <div style={{ width: '800px' }}>
      <DataTableSkeleton
        {...rest}
        headers={headers}
        aria-label="sample table"
      />
      <br />
    </div>
  );
};

export const Playground = (args) => {
  return (
    <div style={{ width: '800px' }}>
      <DataTableSkeleton
        {...args}
        headers={headers}
        aria-label="sample table"
      />
      <br />
    </div>
  );
};

Playground.argTypes = {
  headers: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
};
