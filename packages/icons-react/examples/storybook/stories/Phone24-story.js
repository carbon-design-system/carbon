import React from 'react';
import { storiesOf } from '@storybook/react';
import Phone24 from '../../../es/phone/24.js';

storiesOf('Phone24', module)
  .add('default', () => <Phone24 />)
  .add('with accessibility label', () => (
    <Phone24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Phone24 aria-label="Icon label">
      <title>Icon title</title>
    </Phone24>
  ));
