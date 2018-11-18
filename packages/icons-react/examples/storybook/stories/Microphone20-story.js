import React from 'react';
import { storiesOf } from '@storybook/react';
import Microphone20 from '../../../es/microphone/20.js';

storiesOf('Microphone20', module)
  .add('default', () => <Microphone20 />)
  .add('with accessibility label', () => (
    <Microphone20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Microphone20 aria-label="Icon label">
      <title>Icon title</title>
    </Microphone20>
  ));
