import React from 'react';
import { storiesOf } from '@storybook/react';
import Microphone32 from '../../../lib/microphone/32';

storiesOf('Microphone32', module)
  .add('default', () => <Microphone32 />)
  .add('with accessibility label', () => (
    <Microphone32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Microphone32 focusable>
      <title>Icon title</title>
    </Microphone32>
  ));
