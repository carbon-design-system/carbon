import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretSort24 from '../../../es/caret--sort/24.js';

storiesOf('CaretSort24', module)
  .add('default', () => <CaretSort24 />)
  .add('with accessibility label', () => (
    <CaretSort24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretSort24 aria-label="Icon label">
      <title>Icon title</title>
    </CaretSort24>
  ));
