import React from 'react';
import { storiesOf } from '@storybook/react';
import PhoneOff32 from '../../../es/phone--off/32.js';

storiesOf('PhoneOff32', module)
  .add('default', () => <PhoneOff32 />)
  .add('with accessibility label', () => (
    <PhoneOff32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PhoneOff32 aria-label="Icon label">
      <title>Icon title</title>
    </PhoneOff32>
  ));
