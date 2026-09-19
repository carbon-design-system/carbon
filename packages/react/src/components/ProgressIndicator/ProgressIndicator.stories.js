/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { ProgressIndicator, ProgressStep, ProgressIndicatorSkeleton } from './';
import mdx from './ProgressIndicator.mdx';

const progressIndicatorArgs = {
  currentIndex: 0,
  spaceEqually: false,
  vertical: false,
};

const progressIndicatorArgTypes = {
  currentIndex: {
    control: { type: 'number', min: 0, max: 4 },
    description: 'Optionally specify the current step array index.',
    table: { defaultValue: { summary: 0 } },
  },
  spaceEqually: {
    control: { type: 'boolean' },
    description:
      'Specify whether the progress steps should be split equally in size in the div.',
    table: { defaultValue: { summary: false } },
  },
  vertical: {
    control: { type: 'boolean' },
    description:
      'Determines whether or not the ProgressIndicator should be rendered vertically.',
    table: { defaultValue: { summary: false } },
  },
};

export default {
  title: 'Components/ProgressIndicator',
  component: ProgressIndicator,
  subcomponents: {
    ProgressStep,
    ProgressIndicatorSkeleton,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Interactive = (args) => {
  return (
    <ProgressIndicator {...args}>
      <ProgressStep
        label="Click me"
        description="Step 1: Register an onChange event"
      />
      <ProgressStep
        label="Really long label"
        description="The progress indicator will listen for clicks on the steps"
      />
      <ProgressStep
        label="Third step"
        description="The progress indicator will listen for clicks on the steps"
      />
    </ProgressIndicator>
  );
};

Interactive.args = {
  ...progressIndicatorArgs,
  currentIndex: 1,
  onChange: action('onChange'),
};

Interactive.argTypes = {
  ...progressIndicatorArgTypes,
  currentIndex: {
    ...progressIndicatorArgTypes.currentIndex,
    control: { type: 'number', min: 0, max: 2 },
  },
  onChange: {
    action: 'onChange',
    description:
      'Optional callback called if a ProgressStep is clicked on. Returns the index of the step.',
    table: { defaultValue: { summary: 'undefined' } },
  },
};

export const Skeleton = (args) => <ProgressIndicatorSkeleton {...args} />;

Skeleton.args = {
  vertical: false,
};

Skeleton.argTypes = {
  vertical: progressIndicatorArgTypes.vertical,
};

Skeleton.parameters = {
  controls: { include: ['vertical'] },
};

export const Default = (args) => {
  const { secondaryLabel, ...progressIndicatorProps } = args;

  return (
    <ProgressIndicator {...progressIndicatorProps}>
      <ProgressStep
        complete
        label="First step"
        description="Step 1: Getting started with Carbon Design System"
        secondaryLabel={secondaryLabel}
      />
      <ProgressStep
        current
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
};

Default.args = {
  ...progressIndicatorArgs,
  secondaryLabel: 'Optional label',
};

Default.argTypes = {
  ...progressIndicatorArgTypes,
  secondaryLabel: {
    control: { type: 'text' },
    description: 'Provide an optional secondary label.',
    table: {
      category: 'ProgressStep',
      defaultValue: { summary: 'undefined' },
    },
  },
};
