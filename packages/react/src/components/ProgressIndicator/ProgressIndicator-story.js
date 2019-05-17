/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';
import ProgressIndicatorSkeleton from '../ProgressIndicator/ProgressIndicator.Skeleton';
import Tooltip from '../Tooltip';
import { settings } from 'carbon-components';

const { prefix } = settings;

storiesOf('ProgressIndicator', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <ProgressIndicator
        currentIndex={number('Current progress (currentIndex)', 1)}>
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
              triggerClassName={`${prefix}--progress-label`}
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
              triggerClassName={`${prefix}--progress-label`}
              triggerText={'Third step with tooltip'}
              tooltipId="tooltipId-1">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                consequuntur hic ratione aliquid cupiditate, nesciunt saepe iste
                blanditiis cumque maxime tenetur veniam est illo deserunt sint
                quae pariatur. Laboriosam, consequatur.
              </p>
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
    ),
    {
      info: {
        text: `
            For React usage, ProgressIndicator holds the currentIndex state to indicate which ProgressStep is the current step. The ProgressIndicator component should always be used with ProgressStep components as its children. Changing currentIndex prop will automatically set the ProgressStep components props (complete, incomplete, current).
            For general usage, Progress Indicators display steps in a process. It should indicate when steps have been complete, the active step,
            and the steps to come.
          `,
      },
    }
  )
  .add(
    'interactive',
    () => (
      <ProgressIndicator
        currentIndex={number('Current progress (currentIndex)', 1)}
        onChange={action('onChange')}>
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
              triggerClassName={`${prefix}--progress-label`}
              triggerText="Tooltip and really long label"
              tooltipId="tooltipId-1">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                consequuntur hic ratione aliquid cupiditate, nesciunt saepe iste
                blanditiis cumque maxime tenetur veniam est illo deserunt sint
                quae pariatur. Laboriosam, consequatur.
              </p>
            </Tooltip>
          )}
        />
      </ProgressIndicator>
    ),
    {
      info: {
        text: `
           If you register an onChange handler, the Progress Indicator will become interactive.  Your parent component should update the currentIndex prop within the onChange handler.
          `,
      },
    }
  )
  .add('skeleton', () => <ProgressIndicatorSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
        `,
    },
  });
