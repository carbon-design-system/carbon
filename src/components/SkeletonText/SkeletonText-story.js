/* eslint-disable no-console */

import React from 'react';
import { storiesOf } from '@storybook/react';
import SkeletonText from '../SkeletonText';

storiesOf('SkeletonText', module)
  .addWithInfo(
    'heading',
    `
      Skeleton states are used as a progressive loading state while the user waits for content to load.

      This example shows a skeleton state for a heading. 
    `,
    () => (
      <div style={{ width: '300px' }}>
        <SkeletonText heading />
      </div>
    )
  )
  .addWithInfo(
    'paragraph',
    `
      Skeleton states are used as a progressive loading state while the user waits for content to load.

      This example shows a skeleton state for a paragraph of text.
    `,
    () => (
      <div style={{ width: '500px' }}>
        <SkeletonText paragraph />
        <br />
        <SkeletonText width="250px" lineCount={8} paragraph />
      </div>
    )
  );
