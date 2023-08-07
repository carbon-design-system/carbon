/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-console */

import React from 'react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import DataTableSkeleton from './DataTableSkeleton';
import { headers } from '../DataTable/stories/shared';

const props = () => ({
  zebra: boolean('Use zebra stripe (zebra)', false),
  compact: boolean('Compact variant (compact)', false),
  showHeader: boolean('Show the Table Header (showHeader)', true),
  showToolbar: boolean('Show the Table Toolbar (showToolbar)', true),
});

export default {
  title: 'Components/DataTable/Skeleton',
  decorators: [withKnobs],
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
