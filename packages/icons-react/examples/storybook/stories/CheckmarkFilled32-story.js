import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkFilled32 from '../../../es/checkmark--filled/32.js';

storiesOf('CheckmarkFilled32', module)
  .add('default', () => <CheckmarkFilled32 />)
  .add('with accessibility label', () => (
    <CheckmarkFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </CheckmarkFilled32>
  ));
