/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './progress-indicator';
import './progress-step';
import './progress-indicator-skeleton';
import './progress-step-skeleton';
import storyDocs from './progress-indicator-story.mdx';

export const Default = (args) => {
  const { vertical } = args?.['bx-progress-indicator'] ?? {};
  const { iconLabel, labelText, secondaryLabelText } =
    args?.['bx-progress-step'] ?? {};
  return html`
    <bx-progress-indicator ?vertical="${vertical}">
      <bx-progress-step
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(secondaryLabelText)}"
        state="invalid"></bx-progress-step>
      <bx-progress-step
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(secondaryLabelText)}"
        state="complete"></bx-progress-step>
      <bx-progress-step
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(secondaryLabelText)}"
        state="current"></bx-progress-step>
      <bx-progress-step
        disabled
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(
          secondaryLabelText
        )}"></bx-progress-step>
      <bx-progress-step
        icon-label="${ifNonNull(iconLabel)}"
        label-text="${ifNonNull(labelText)}"
        secondary-label-text="${ifNonNull(
          secondaryLabelText
        )}"></bx-progress-step>
    </bx-progress-indicator>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    'bx-progress-indicator': () => ({
      vertical: boolean('Vertical (vertical)', false),
    }),
    'bx-progress-step': () => ({
      iconLabel: textNullable('Icon label (icon-label)', ''),
      labelText: textNullable('Primary label text (label-text)', 'Label'),
      secondaryLabelText: textNullable(
        'Secondary label text (secondary-label-text)',
        'Secondary label'
      ),
    }),
  },
};

export const skeleton = (args) => {
  const { vertical } = args?.['bx-progress-indicator-skeleton'];
  return html`
    <bx-progress-indicator-skeleton ?vertical="${vertical}">
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
    </bx-progress-indicator-skeleton>
  `;
};

skeleton.parameters = {
  percy: {
    skip: true,
  },
  knobs: {
    'bx-progress-indicator-skeleton': () => ({
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
