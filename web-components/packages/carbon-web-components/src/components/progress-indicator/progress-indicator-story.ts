/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { boolean } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import './progress-indicator';
import './progress-step';
import './progress-indicator-skeleton';
import './progress-step-skeleton';
import storyDocs from './progress-indicator-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = () => html`
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
`;

export const Interactive = () => html`
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
`;

export const Playground = (args) => {
  const { vertical, spaceEqually } =
    args?.[`${prefix}-progress-indicator`] ?? {};
  const { iconLabel, secondaryLabelText } =
    args?.[`${prefix}-progress-step`] ?? {};
  return html`
    <cds-progress-indicator
      ?vertical="${vertical}"
      ?space-equally="${spaceEqually}">
      <cds-progress-step
        description="${ifDefined(iconLabel)}"
        label="First step"
        secondary-label="${ifDefined(secondaryLabelText)}"
        state="complete"></cds-progress-step>
      <cds-progress-step
        description="${ifDefined(iconLabel)}"
        label="Second step with tooltip"
        state="current"></cds-progress-step>
      <cds-progress-step
        description="${ifDefined(iconLabel)}"
        label="Third step with tooltip"
        state="incomplete"></cds-progress-step>
      <cds-progress-step
        description="${ifDefined(iconLabel)}"
        label="Fourth step"
        secondary-label="Example invalid step"
        state="invalid"></cds-progress-step>
      <cds-progress-step
        disabled
        description="${ifDefined(iconLabel)}"
        label="Fifth step"
        state="incomplete"></cds-progress-step>
    </cds-progress-indicator>
  `;
};

Playground.parameters = {
  ...storyDocs.parameters,
  knobs: {
    [`${prefix}-progress-indicator`]: () => ({
      vertical: boolean('Vertical (vertical)', false),
      spaceEqually: boolean('Space equally (space-equally)', false),
    }),
    [`${prefix}-progress-step`]: () => ({
      description: textNullable('Icon label (description)', ''),
      secondaryLabelText: textNullable(
        'Secondary label text (secondary-label)',
        'Optional label'
      ),
    }),
  },
};

export const skeleton = (args) => {
  const { vertical } = args?.[`${prefix}-progress-indicator-skeleton`] || '';
  return html`
    <cds-progress-indicator-skeleton ?vertical="${vertical}">
      <cds-progress-step-skeleton></cds-progress-step-skeleton>
      <cds-progress-step-skeleton></cds-progress-step-skeleton>
      <cds-progress-step-skeleton></cds-progress-step-skeleton>
      <cds-progress-step-skeleton></cds-progress-step-skeleton>
    </cds-progress-indicator-skeleton>
  `;
};

skeleton.parameters = {
  percy: {
    skip: true,
  },
  knobs: {
    [`${prefix}-progress-indicator-skeleton`]: () => ({
      vertical: boolean('Vertical (vertical)', false),
    }),
  },
};

export default {
  title: 'Components/Progress indicator',
};
