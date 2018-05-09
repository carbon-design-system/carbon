/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import DataTableSkeleton from '../DataTableSkeleton';

storiesOf('DataTableSkeleton', module)
  .addWithInfo(
    'default',
    `
      Skeleton states are used as a progressive loading state while the user waits for content to load.

      This example shows a skeleton state for a data table.
    `,
    () => (
      <div style={{ width: '800px' }}>
        <DataTableSkeleton />
        <br />
      </div>
    )
  )
  .addWithInfo(
    'zebra',
    `
      Skeleton states are used as a progressive loading state while the user waits for content to load.

      This example shows a skeleton state for a data table.
    `,
    () => (
      <div style={{ width: '800px' }}>
        <DataTableSkeleton zebra />
      </div>
    )
  )
  .addWithInfo(
    'compact',
    `
      Skeleton states are used as a progressive loading state while the user waits for content to load.

      This example shows a skeleton state for a compact data table.
    `,
    () => (
      <div style={{ width: '800px' }}>
        <DataTableSkeleton compact zebra rowCount={10} />
      </div>
    )
  );
