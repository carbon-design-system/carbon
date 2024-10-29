/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import './index';
import ifNonEmpty from '../../globals/directives/if-non-empty';

const args = {
  vertical: false,
  spaceEqually: false,
  iconLabel: '',
  secondaryLabelText: 'Optional label',
};

const argTypes = {
  vertical: {
    control: 'boolean',
    description:
      'Determines whether or not the Progress Indicator should be rendered vertically.',
  },
  spaceEqually: {
    control: 'boolean',
    description:
      'Specify whether the progress steps should be split equally in size in the div.',
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
  render: () => html`
    <cds-progress-indicator>
      <cds-progress-step
        state="complete"
        label="First step"
        secondary-label="Optional label"
        description="Step 1: Getting started with Carbon Design System"></cds-progress-step>
      <cds-progress-step
        label="Second step with tooltip"
        state="current"></cds-progress-step>
      <cds-progress-step
        label="Third step with tooltip"
        state="incomplete"></cds-progress-step>
      <cds-progress-step
        label="Fourth step"
        secondary-label="Example invalid step"
        state="invalid"></cds-progress-step>
      <cds-progress-step
        disabled
        label="Fifth step"
        state="incomplete"></cds-progress-step>
    </cds-progress-indicator>
  `,
};

export const Interactive = {
  render: () => html`
    <cds-progress-indicator>
      <cds-progress-step
        label="Click me"
        description="Step 1: Register a onChange event"
        state="complete"></cds-progress-step>
      <cds-progress-step
        label="Really long label"
        description="The progress indicator will listen for clicks on the steps"
        state="current"></cds-progress-step>
      <cds-progress-step
        label="Third step with tooltip"
        description="The progress indicator will listen for clicks on the steps"
        state="incomplete"></cds-progress-step>
    </cds-progress-indicator>
  `,
};

export const Skeleton = {
  args: {
    vertical: args['vertical'],
  },
  argTypes: {
    vertical: args['vertical'],
  },
  parameters: {
    percy: {
      skip: true,
    },
  },
  render: (args) => {
    const { vertical } = args ?? {};
    return html`
      <cds-progress-indicator-skeleton ?vertical="${vertical}">
        <cds-progress-step-skeleton></cds-progress-step-skeleton>
        <cds-progress-step-skeleton></cds-progress-step-skeleton>
        <cds-progress-step-skeleton></cds-progress-step-skeleton>
        <cds-progress-step-skeleton></cds-progress-step-skeleton>
      </cds-progress-indicator-skeleton>
    `;
  },
};

export const Playground = {
  args,
  argTypes,
  render: (args) => {
    const { iconLabel, secondaryLabelText, spaceEqually, vertical } =
      args ?? {};
    return html`
      <cds-progress-indicator
        ?vertical="${vertical}"
        ?space-equally="${spaceEqually}">
        <cds-progress-step
          description="${ifNonEmpty(iconLabel)}"
          label="First step"
          secondary-label="${ifDefined(secondaryLabelText)}"
          state="complete"></cds-progress-step>
        <cds-progress-step
          description="${ifNonEmpty(iconLabel)}"
          label="Second step with tooltip"
          state="current"></cds-progress-step>
        <cds-progress-step
          description="${ifNonEmpty(iconLabel)}"
          label="Third step with tooltip"
          state="incomplete"></cds-progress-step>
        <cds-progress-step
          description="${ifNonEmpty(iconLabel)}"
          label="Fourth step"
          secondary-label="Example invalid step"
          state="invalid"></cds-progress-step>
        <cds-progress-step
          disabled
          description="${ifNonEmpty(iconLabel)}"
          label="Fifth step"
          state="incomplete"></cds-progress-step>
      </cds-progress-indicator>
    `;
  },
};

const meta = {
  title: 'Components/Progress Indicator',
};

export default meta;
