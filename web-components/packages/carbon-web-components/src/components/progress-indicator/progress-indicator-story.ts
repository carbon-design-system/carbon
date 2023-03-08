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

export const Default = (args) => {
  const { vertical } = args?.[`${prefix}-progress-indicator`] ?? {};
  const { iconLabel, secondaryLabelText } =
    args?.[`${prefix}-progress-step`] ?? {};
  return html`
    <cds-progress-indicator ?vertical="${vertical}">
      <cds-progress-step
        icon-label="${ifDefined(iconLabel)}"
        label-text="First step"
        secondary-label-text="${ifDefined(secondaryLabelText)}"
        state="complete"></cds-progress-step>
      <cds-progress-step
        icon-label="${ifDefined(iconLabel)}"
        label-text="Second step with tooltip"
        state="current"></cds-progress-step>
      <cds-progress-step
        icon-label="${ifDefined(iconLabel)}"
        label-text="Third step with tooltip"
        state="incomplete"></cds-progress-step>
      <cds-progress-step
        icon-label="${ifDefined(iconLabel)}"
        label-text="Fourth step"
        secondary-label-text="Example invalid step"
        state="invalid"></cds-progress-step>
      <cds-progress-step
        disabled
        icon-label="${ifDefined(iconLabel)}"
        label-text="Fifth step"
        state="incomplete"></cds-progress-step>
    </cds-progress-indicator>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-progress-indicator`]: () => ({
      vertical: boolean('Vertical (vertical)', false),
    }),
    [`${prefix}-progress-step`]: () => ({
      iconLabel: textNullable('Icon label (icon-label)', ''),
      secondaryLabelText: textNullable(
        'Secondary label text (secondary-label-text)',
        'Secondary label'
      ),
    }),
  },
};

export const skeleton = (args) => {
  const { vertical } = args?.[`${prefix}-progress-indicator-skeleton`];
  return html`
    <cds-progress-indicator-skeleton ?vertical="${vertical}">
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
  parameters: {
    ...storyDocs.parameters,
  },
};
