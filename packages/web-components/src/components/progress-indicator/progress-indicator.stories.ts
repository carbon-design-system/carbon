/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';

const args = {
  currentIndex: 0,
  vertical: false,
  spaceEqually: false,
  iconLabel: '',
  secondaryLabelText: 'Optional label',
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
  iconLabel: {
    control: 'text',
    description: 'Label used for the SVG icons in each step.',
  },
  secondaryLabelText: {
    control: 'text',
    description: 'The secondary progress label.',
  },
};

export const Default = {
  args,
  argTypes,
  render: ({ secondaryLabelText, spaceEqually, vertical }) => html`
    <cds-progress-indicator
      ?vertical="${vertical}"
      ?space-equally="${spaceEqually}">
      <cds-progress-step
        description="Step 1: Getting started with Carbon Design System"
        label="First step"
        secondary-label="${ifDefined(secondaryLabelText)}"
        state="complete"></cds-progress-step>
      <cds-progress-step
        description="Step 2: Getting started with Carbon Design System"
        label="Second step with tooltip"
        state="current"></cds-progress-step>
      <cds-progress-step
        description="Step 3: Getting started with Carbon Design System"
        label="Third step with tooltip"
        state="incomplete"></cds-progress-step>
      <cds-progress-step
        description="Step 4: Getting started with Carbon Design System"
        label="Fourth step"
        secondary-label="Example invalid step"
        state="invalid"></cds-progress-step>
      <cds-progress-step
        disabled
        description="Step 5: Getting started with Carbon Design System"
        label="Fifth step"
        state="incomplete"></cds-progress-step>
    </cds-progress-indicator>
  `,
};

export const Interactive = {
  render: () => html`
    <cds-progress-indicator
      current-index="1"
      .onChange=${() => alert('Clicked')}>
      <cds-progress-step
        label="Click me"
        description="Step 1: Register an onChange event"
        state="complete"></cds-progress-step>
      <cds-progress-step
        label="Really long label"
        description="The progress indicator will listen for clicks on the steps"
        state="current"></cds-progress-step>
      <cds-progress-step
        label="Third step"
        description="The progress indicator will listen for clicks on the steps"
        state="incomplete"></cds-progress-step>
    </cds-progress-indicator>
  `,
};

export const Skeleton = {
  parameters: {
    percy: { skip: true },
  },
  render: () => html`
    <cds-progress-indicator-skeleton>
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
