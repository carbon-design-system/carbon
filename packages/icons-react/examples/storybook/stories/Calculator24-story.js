import React from 'react';
import { storiesOf } from '@storybook/react';
import Calculator24 from '../../../es/calculator/24.js';

storiesOf('Calculator24', module)
  .add('default', () => <Calculator24 />)
  .add('with accessibility label', () => (
    <Calculator24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calculator24 aria-label="Icon label">
      <title>Icon title</title>
    </Calculator24>
  ));
