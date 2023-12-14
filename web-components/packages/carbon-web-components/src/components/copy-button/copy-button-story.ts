/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook-backup/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import './copy-button';
import storyDocs from './copy-button-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = (args) => {
  const { iconDescription, feedbackText, feedbackTimeout, onClick } =
    args?.[`${prefix}-copy-button`] ?? {};
  return html`
    <cds-copy-button
      feedback="${ifDefined(feedbackText)}"
      feedback-timeout="${ifDefined(feedbackTimeout)}"
      @click="${onClick}">
      ${iconDescription}
    </cds-copy-button>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Copy button',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-copy-button`]: () => ({
        iconDescription: textNullable(
          'Icon description (slotted)',
          'Copy to clipboard'
        ),
        feedbackText: textNullable('Feedback text (feedback)', 'Copied!'),
        feedbackTimeout: number('Feedback timeout (feedback-timeout)', 2000),
        onClick: action('click'),
      }),
    },
  },
};
