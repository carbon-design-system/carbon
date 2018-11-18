import React from 'react';
import { storiesOf } from '@storybook/react';
import MicrophoneOff24 from '../../../es/microphone--off/24.js';

storiesOf('MicrophoneOff24', module)
  .add('default', () => <MicrophoneOff24 />)
  .add('with accessibility label', () => (
    <MicrophoneOff24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MicrophoneOff24 aria-label="Icon label">
      <title>Icon title</title>
    </MicrophoneOff24>
  ));
