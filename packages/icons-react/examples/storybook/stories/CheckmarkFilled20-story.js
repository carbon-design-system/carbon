import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkFilled20 from '../../../es/checkmark--filled/20.js';

storiesOf('CheckmarkFilled20', module)
  .add('default', () => <CheckmarkFilled20 />)
  .add('with accessibility label', () => (
    <CheckmarkFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </CheckmarkFilled20>
  ));
