import React from 'react';
import { storiesOf } from '@storybook/react';
import PhoneOff20 from '../../../es/phone--off/20.js';

storiesOf('PhoneOff20', module)
  .add('default', () => <PhoneOff20 />)
  .add('with accessibility label', () => (
    <PhoneOff20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PhoneOff20 aria-label="Icon label">
      <title>Icon title</title>
    </PhoneOff20>
  ));
