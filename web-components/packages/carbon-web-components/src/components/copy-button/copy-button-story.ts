/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { number } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './copy-button';
import storyDocs from './copy-button-story.mdx';

export const Default = (args) => {
  const { buttonAssistiveText, feedbackText, feedbackTimeout, onClick } = args?.['bx-copy-button'] ?? {};
  return html`
    <bx-copy-button
      button-assistive-text="${ifNonNull(buttonAssistiveText)}"
      feedback-text="${ifNonNull(feedbackText)}"
      feedback-timeout="${ifNonNull(feedbackTimeout)}"
      @click="${onClick}"
    ></bx-copy-button>
  `;
};

Default.storyName = 'Default';

export default {
  title: 'Components/Copy button',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      'bx-copy-button': () => ({
        buttonAssistiveText: textNullable('Assistive text for the button (button-assistive-text)', ''),
        feedbackText: textNullable('Feedback text (feedback-text)', ''),
        feedbackTimeout: number('Feedback timeout (feedback-timeout)', 2000),
        onClick: action('click'),
      }),
    },
  },
};
