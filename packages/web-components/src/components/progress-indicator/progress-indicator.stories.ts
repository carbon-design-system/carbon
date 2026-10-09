/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { action } from 'storybook/actions';
import { expect, fn, userEvent } from 'storybook/test';
import type CDSProgressIndicator from './progress-indicator';
import type CDSProgressStep from './progress-step';
import type CDSProgressIndicatorSkeleton from './progress-indicator-skeleton';
import './index';

const args = {
  currentIndex: 0,
  vertical: false,
  spaceEqually: false,
  secondaryLabel: 'Optional label',
};

const argTypes = {
  currentIndex: {
    control: 'number',
    description: 'Optionally specify the current step array index.',
    table: { defaultValue: { summary: 0 } },
  },
  vertical: {
    control: 'boolean',
    description:
      'Determines whether or not the Progress Indicator should be rendered vertically.',
    table: { defaultValue: { summary: false } },
  },
  spaceEqually: {
    control: 'boolean',
    description:
      'Specify whether progress steps should be split equally in size (horizontal only).',
    table: { defaultValue: { summary: false } },
  },
  secondaryLabel: {
    control: 'text',
    description: 'The secondary progress label.',
    table: {
      category: 'ProgressStep',
      defaultValue: { summary: 'undefined' },
    },
  },
};

export const Default = {
  args,
  argTypes,
  play: async ({ canvasElement, args }) => {
    const indicator = canvasElement.querySelector(
      'cds-progress-indicator'
    ) as CDSProgressIndicator;
    await indicator.updateComplete;
    const step = indicator.querySelector(
      'cds-progress-step'
    ) as CDSProgressStep;
    await step.updateComplete;
    await expect(indicator.currentIndex).toBe(args.currentIndex);
    await expect(indicator.vertical).toBe(args.vertical);
    await expect(indicator.spaceEqually).toBe(args.spaceEqually);
    await expect(step.secondaryLabel).toBe(args.secondaryLabel);
  },
  render: ({ secondaryLabel, spaceEqually, vertical, currentIndex }) => html`
    <cds-progress-indicator
      ?vertical="${vertical}"
      ?space-equally="${spaceEqually}"
      current-index="${currentIndex}">
      <cds-progress-step
        description="Step 1: Getting started with Carbon Design System"
        label="First step"
        secondary-label="${ifDefined(secondaryLabel)}"
        complete></cds-progress-step>
      <cds-progress-step
        description="Step 2: Getting started with Carbon Design System"
        label="Second step with tooltip"
        current></cds-progress-step>
      <cds-progress-step
        description="Step 3: Getting started with Carbon Design System"
        label="Third step with tooltip"></cds-progress-step>
      <cds-progress-step
        description="Step 4: Getting started with Carbon Design System"
        label="Fourth step"
        secondary-label="Example invalid step"
        invalid></cds-progress-step>
      <cds-progress-step
        disabled
        description="Step 5: Getting started with Carbon Design System"
        label="Fifth step"></cds-progress-step>
    </cds-progress-indicator>
  `,
};

export const Interactive = {
  play: async ({ canvasElement, args }) => {
    const indicator = canvasElement.querySelector(
      'cds-progress-indicator'
    ) as CDSProgressIndicator;
    await indicator.updateComplete;
    await expect(indicator.currentIndex).toBe(args.currentIndex);
    await expect(indicator.vertical).toBe(args.vertical);
    await expect(indicator.spaceEqually).toBe(args.spaceEqually);

    const step = indicator.querySelector(
      'cds-progress-step'
    ) as CDSProgressStep;
    await step.updateComplete;
    args.onChange.mockClear();
    const button = step.shadowRoot?.querySelector('[role="button"]');
    if (!button) {
      throw new Error('Expected an interactive progress step button');
    }
    await userEvent.click(button);
    await expect(args.onChange).toHaveBeenCalledTimes(1);
    await expect(args.onChange).toHaveBeenCalledWith(
      expect.objectContaining({ detail: { index: 0 } })
    );
  },
  args: {
    currentIndex: 1,
    onChange: fn(action('onChange')),
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
      description:
        'Optional callback called if a ProgressStep is clicked on. Returns the index of the step.',
      table: { defaultValue: { summary: 'undefined' } },
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
        label="Click me"
        description="Step 1: Register an onChange event"
        complete></cds-progress-step>
      <cds-progress-step
        label="Really long label"
        description="The progress indicator will listen for clicks on the steps"
        current></cds-progress-step>
      <cds-progress-step
        label="Third step"
        description="The progress indicator will listen for clicks on the steps"></cds-progress-step>
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
  play: async ({ canvasElement, args }) => {
    const indicator = canvasElement.querySelector(
      'cds-progress-indicator-skeleton'
    ) as CDSProgressIndicatorSkeleton;
    await indicator.updateComplete;
    await expect(indicator.vertical).toBe(args.vertical);
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
