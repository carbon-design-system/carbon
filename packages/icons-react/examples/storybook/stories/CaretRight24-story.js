import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretRight24 from '../../../es/caret--right/24.js';

storiesOf('CaretRight24', module)
  .add('default', () => <CaretRight24 />)
  .add('with accessibility label', () => (
    <CaretRight24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretRight24 aria-label="Icon label">
      <title>Icon title</title>
    </CaretRight24>
  ));
