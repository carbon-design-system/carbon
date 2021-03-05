/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, number, text } from '@storybook/addon-knobs';
import CopyButton from '../CopyButton';
import mdx from './CopyButton.mdx';

const props = () => ({
  feedback: text('The text shown upon clicking (feedback)', 'Copied!'),
  feedbackTimeout: number(
    'How long the text is shown upon clicking (feedbackTimeout)',
    3000
  ),
  iconDescription: text(
    'Feedback icon description (iconDescription)',
    'Copy to clipboard'
  ),
  onClick: action('onClick'),
});

export default {
  title: 'Components/CopyButton',
  decorators: [withKnobs],

  parameters: {
    component: CopyButton,
    docs: {
      page: mdx,
    },
  },
};

export const _Default = () => <CopyButton />;

_Default.story = {
  name: 'Copy Button',
};

export const Playground = () => <CopyButton {...props()} />;
