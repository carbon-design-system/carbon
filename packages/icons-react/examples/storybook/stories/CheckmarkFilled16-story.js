import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkFilled16 from '../../../es/checkmark--filled/16.js';

storiesOf('CheckmarkFilled16', module)
  .add('default', () => <CheckmarkFilled16 />)
  .add('with accessibility label', () => (
    <CheckmarkFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkFilled16 aria-label="Icon label">
      <title>Icon title</title>
    </CheckmarkFilled16>
  ));
