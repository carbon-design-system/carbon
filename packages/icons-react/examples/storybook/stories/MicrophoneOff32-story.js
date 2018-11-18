import React from 'react';
import { storiesOf } from '@storybook/react';
import MicrophoneOff32 from '../../../es/microphone--off/32.js';

storiesOf('MicrophoneOff32', module)
  .add('default', () => <MicrophoneOff32 />)
  .add('with accessibility label', () => (
    <MicrophoneOff32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MicrophoneOff32 aria-label="Icon label">
      <title>Icon title</title>
    </MicrophoneOff32>
  ));
