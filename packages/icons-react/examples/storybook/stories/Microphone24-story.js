import React from 'react';
import { storiesOf } from '@storybook/react';
import Microphone24 from '../../../es/microphone/24.js';

storiesOf('Microphone24', module)
  .add('default', () => <Microphone24 />)
  .add('with accessibility label', () => (
    <Microphone24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Microphone24 aria-label="Icon label">
      <title>Icon title</title>
    </Microphone24>
  ));
