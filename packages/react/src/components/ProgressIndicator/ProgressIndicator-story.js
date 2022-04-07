/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { ProgressIndicator, ProgressStep } from '../ProgressIndicator';
import ProgressIndicatorSkeleton from '../ProgressIndicator/ProgressIndicator.Skeleton';
import mdx from './ProgressIndicator.mdx';

export default {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  subcomponents: {
    ProgressStep,
  },
};

export const Default = () => (
  <ProgressIndicator
    vertical={boolean('Vertical (vertical)', false)}
    currentIndex={number('Current progress (currentIndex)', 1)}
    spaceEqually={boolean('Space Equally (spaceEqually)', false)}>
    <ProgressStep
      label={text('Label (label)', 'First step')}
      description="Step 1: Getting started with Carbon Design System"
      secondaryLabel="Optional label"
    />
    <ProgressStep
      label="Second step with tooltip"
      description="Step 2: Getting started with Carbon Design System"
    />
    <ProgressStep
      label="Third step with tooltip"
      description="Step 3: Getting started with Carbon Design System"
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
    />
  </ProgressIndicator>
);

Interactive.storyName = 'interactive';

export const Skeleton = () => <ProgressIndicatorSkeleton />;

Skeleton.storyName = 'skeleton';
