/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
  ProgressIndicator,
  ProgressStep,
  ProgressIndicatorSkeleton,
  Tooltip,
} from 'carbon-components-react';
// import Tooltip from '../Tooltip';

export default {
  title: 'Components/ProgressIndicator',
};

export const Default = () => (
  <ProgressIndicator>
    <ProgressStep
      label="First step"
      description="Step 1: Getting started with Carbon Design System"
      secondaryLabel="Optional label"
    />
    <ProgressStep
      label="Second step with tooltip"
      description="Step 2: Getting started with Carbon Design System"
      renderLabel={() => (
        <Tooltip
          direction="bottom"
          showIcon={false}
          triggerClassName={`bx--progress-label`}
          triggerText={'Second step with tooltip'}
          tooltipId="tooltipId-0">
          <p>Overflow tooltip content.</p>
        </Tooltip>
      )}
    />
    <ProgressStep
      label="Third step with tooltip"
      description="Step 3: Getting started with Carbon Design System"
      renderLabel={() => (
        <Tooltip
          direction="bottom"
          showIcon={false}
          triggerClassName={`bx--progress-label`}
          triggerText={'Second step with tooltip'}
          tooltipId="tooltipId-0">
          <p>Overflow tooltip content.</p>
        </Tooltip>
      )}
    />
    <ProgressStep
      label="Fourth step"
      description="Step 4: Getting started with Carbon Design System"
      invalid
      secondaryLabel="Example invalid step"
    />
    <ProgressStep
      label="Fifth step"
      description="Step 5: Getting started with Carbon Design System"
      disabled
    />
  </ProgressIndicator>
);

export const Interactive = () => (
  <ProgressIndicator currentIndex={1} onChange={() => alert('Clicked')}>
    <ProgressStep
      label="Click me"
      description="Step 1: Register a onChange event"
    />
    <ProgressStep
      label="Really long label"
      description="The progress indicator will listen for clicks on the steps"
    />
    <ProgressStep
      label="Tooltip and really long label"
      description="The progress indicator will listen for clicks on the steps"
      renderLabel={() => (
        <Tooltip
          direction="bottom"
          showIcon={false}
          triggerClassName={`bx--progress-label`}
          triggerText="Tooltip and really long label"
          tooltipId="tooltipId-1">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
            consequuntur hic ratione aliquid cupiditate, nesciunt saepe iste
            blanditiis cumque maxime tenetur veniam est illo deserunt sint quae
            pariatur. Laboriosam, consequatur.
          </p>
        </Tooltip>
      )}
    />
  </ProgressIndicator>
);

export const Skeleton = () => <ProgressIndicatorSkeleton />;
