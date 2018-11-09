import React from 'react';
import { storiesOf } from '@storybook/react';
import MicrophoneOff32 from '../../../lib/MicrophoneOff/32';

storiesOf('MicrophoneOff32', module)
  .add('default', () => <MicrophoneOff32 />)
  .add('with accessibility label', () => (
    <MicrophoneOff32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MicrophoneOff32 focusable>
      <title>Icon title</title>
    </MicrophoneOff32>
  ));
