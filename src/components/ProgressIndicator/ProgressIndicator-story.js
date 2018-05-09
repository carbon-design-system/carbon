import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';
import ProgressIndicatorSkeleton from '../ProgressIndicator/ProgressIndicator.Skeleton';

storiesOf('Progress Indicator', module)
  .addWithInfo(
    'Default',
    `
      For React usage, ProgressIndicator holds the currentIndex state to indicate which ProgerssStep is the current step. The ProgressIndicator component should always be used with ProgressStep components as its children. Changing currentIndex prop will automatically set the ProgressStep components props (complete, incomplete, current).
      For general usage, Progress Indicators display steps in a process. It should indicate when steps have been complete, the active step,
      and the steps to come.
    `,
    () => (
      <ProgressIndicator currentIndex={3}>
        <ProgressStep
          label="First step"
          description="Step 1: Getting Started with Node.js"
        />
        <ProgressStep
          label="Second step"
          description="Step 2: Getting Started with Node.js"
        />
        <ProgressStep
          label="Third step"
          description="Step 3: Getting Started with Node.js"
        />
        <ProgressStep
          label="Fourth step"
          description="Step 4: Getting Started with Node.js"
        />
        <ProgressStep
          label="Fifth step"
          description="Step 5: Getting Started with Node.js"
        />
      </ProgressIndicator>
    )
  )
  .addWithInfo(
    'skeleton',
    `
    Placeholder skeleton state to use when content is loading.
    `,
    () => <ProgressIndicatorSkeleton />
  );
