import React from 'react';
import { storiesOf } from '@storybook/react';
import MicrophoneOff20 from '../../../es/microphone--off/20.js';

storiesOf('MicrophoneOff20', module)
  .add('default', () => <MicrophoneOff20 />)
  .add('with accessibility label', () => (
    <MicrophoneOff20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MicrophoneOff20 aria-label="Icon label">
      <title>Icon title</title>
    </MicrophoneOff20>
  ));
