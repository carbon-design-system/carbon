import React from 'react';
import { storiesOf } from '@storybook/react';
import Calculator20 from '../../../es/calculator/20.js';

storiesOf('Calculator20', module)
  .add('default', () => <Calculator20 />)
  .add('with accessibility label', () => (
    <Calculator20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calculator20 aria-label="Icon label">
      <title>Icon title</title>
    </Calculator20>
  ));
