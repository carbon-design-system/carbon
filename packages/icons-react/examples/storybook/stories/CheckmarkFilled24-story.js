import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkFilled24 from '../../../es/checkmark--filled/24.js';

storiesOf('CheckmarkFilled24', module)
  .add('default', () => <CheckmarkFilled24 />)
  .add('with accessibility label', () => (
    <CheckmarkFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </CheckmarkFilled24>
  ));
