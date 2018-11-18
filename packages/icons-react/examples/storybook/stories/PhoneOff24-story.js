import React from 'react';
import { storiesOf } from '@storybook/react';
import PhoneOff24 from '../../../es/phone--off/24.js';

storiesOf('PhoneOff24', module)
  .add('default', () => <PhoneOff24 />)
  .add('with accessibility label', () => (
    <PhoneOff24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PhoneOff24 aria-label="Icon label">
      <title>Icon title</title>
    </PhoneOff24>
  ));
