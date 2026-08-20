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
  currentIndex: 1,
  spaceEqually: false,
  vertical: false,
};

const progressIndicatorArgTypes = {
  currentIndex: {
    control: { type: 'number', min: 0, max: 4 },
  },
  spaceEqually: {
    control: { type: 'boolean' },
  },
  vertical: {
    control: { type: 'boolean' },
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
        label="Create your account"
        description="Enter your account and contact information"
      />
      <ProgressStep
        label="Configure workspace settings and permissions"
        description="Choose workspace defaults and assign access levels"
      />
      <ProgressStep
        label="Invite team members"
        description="Add collaborators and review their roles"
      />
    </ProgressIndicator>
  );
};

Interactive.args = {
  ...progressIndicatorArgs,
  onChange: action('onChange'),
};

Interactive.argTypes = {
  ...progressIndicatorArgTypes,
  currentIndex: {
    control: { type: 'number', min: 0, max: 2 },
  },
  onChange: {
    action: 'onChange',
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
        label="Choose a plan"
        description="Select the plan that best fits your team"
        secondaryLabel={secondaryLabel}
      />
      <ProgressStep
        label="Set up your account"
        description="Enter your account and contact information"
      />
      <ProgressStep
        label="Configure your workspace"
        description="Choose workspace defaults and permissions"
      />
      <ProgressStep
        label="Invite team members"
        description="Add collaborators and assign their roles"
        invalid
        secondaryLabel="Action required"
      />
      <ProgressStep
        label="Review and launch"
        description="Confirm your settings and create the workspace"
        disabled
      />
    </ProgressIndicator>
  );
};

Default.args = {
  ...progressIndicatorArgs,
  secondaryLabel: 'Recommended',
};

Default.argTypes = {
  ...progressIndicatorArgTypes,
  secondaryLabel: {
    control: { type: 'text' },
    table: {
      category: 'ProgressStep',
    },
  },
};
