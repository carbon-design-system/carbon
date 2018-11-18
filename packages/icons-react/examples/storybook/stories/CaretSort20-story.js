import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretSort20 from '../../../es/caret--sort/20.js';

storiesOf('CaretSort20', module)
  .add('default', () => <CaretSort20 />)
  .add('with accessibility label', () => (
    <CaretSort20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretSort20 aria-label="Icon label">
      <title>Icon title</title>
    </CaretSort20>
  ));
