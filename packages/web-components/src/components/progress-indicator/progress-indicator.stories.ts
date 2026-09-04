/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';
import './index';

const args = {
  currentIndex: 1,
  vertical: false,
  spaceEqually: false,
  secondaryLabel: 'Recommended',
};

const argTypes = {
  currentIndex: {
    control: 'number',
    description: 'Optionally specify the current step array index.',
  },
  vertical: {
    control: 'boolean',
    description:
      'Determines whether or not the Progress Indicator should be rendered vertically.',
  },
  spaceEqually: {
    control: 'boolean',
    description:
      'Specify whether progress steps should be split equally in size (horizontal only).',
  },
  secondaryLabel: {
    control: 'text',
    description: 'The secondary progress label.',
    table: {
      category: 'ProgressStep',
    },
  },
};

export const Default = {
  args,
  argTypes,
  render: ({ secondaryLabel, spaceEqually, vertical, currentIndex }) => html`
    <cds-progress-indicator
      ?vertical="${vertical}"
      ?space-equally="${spaceEqually}"
      current-index="${currentIndex}">
      <cds-progress-step
        description="Select the plan that best fits your team"
        label="Choose a plan"
        secondary-label="${ifDefined(secondaryLabel)}"></cds-progress-step>
      <cds-progress-step
        description="Enter your account and contact information"
        label="Set up your account"></cds-progress-step>
      <cds-progress-step
        description="Choose workspace defaults and permissions"
        label="Configure your workspace"></cds-progress-step>
      <cds-progress-step
        description="Add collaborators and assign their roles"
        label="Invite team members"
        secondary-label="Action required"
        invalid></cds-progress-step>
      <cds-progress-step
        disabled
        description="Confirm your settings and create the workspace"
        label="Review and launch"></cds-progress-step>
    </cds-progress-indicator>
  `,
};

export const Interactive = {
  args: {
    currentIndex: 1,
    onChange: action('onChange'),
    spaceEqually: false,
    vertical: false,
  },
  argTypes: {
    currentIndex: {
      ...argTypes.currentIndex,
      control: { type: 'number', min: 0, max: 2 },
    },
    onChange: {
      action: 'onChange',
    },
    spaceEqually: argTypes.spaceEqually,
    vertical: argTypes.vertical,
  },
  render: ({ currentIndex, onChange, spaceEqually, vertical }) => html`
    <cds-progress-indicator
      current-index="${currentIndex}"
      .onChange=${onChange}
      ?space-equally="${spaceEqually}"
      ?vertical="${vertical}">
      <cds-progress-step
        label="Create your account"
        description="Enter your account and contact information"></cds-progress-step>
      <cds-progress-step
        label="Configure workspace settings and permissions"
        description="Choose workspace defaults and assign access levels"></cds-progress-step>
      <cds-progress-step
        label="Invite team members"
        description="Add collaborators and review their roles"></cds-progress-step>
    </cds-progress-indicator>
  `,
};

export const Skeleton = {
  args: {
    vertical: false,
  },
  argTypes: {
    vertical: argTypes.vertical,
  },
  render: ({ vertical }) => html`
    <cds-progress-indicator-skeleton ?vertical="${vertical}">
      <cds-progress-step-skeleton></cds-progress-step-skeleton>
      <cds-progress-step-skeleton></cds-progress-step-skeleton>
      <cds-progress-step-skeleton></cds-progress-step-skeleton>
      <cds-progress-step-skeleton></cds-progress-step-skeleton>
    </cds-progress-indicator-skeleton>
  `,
};

const meta = {
  title: 'Components/Progress Indicator',
};

export default meta;
