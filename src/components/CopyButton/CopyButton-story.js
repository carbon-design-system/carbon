import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, number, text } from '@storybook/addon-knobs';
import CopyButton from '../CopyButton';

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

storiesOf('CopyButton', module)
  .addDecorator(withKnobs)
  .add('Default', () => <CopyButton {...props()} />, {
    info: {
      text:
        'The copy button can be used when the user needs to copy information, such as a code snippet, to their clipboard.',
    },
  });
