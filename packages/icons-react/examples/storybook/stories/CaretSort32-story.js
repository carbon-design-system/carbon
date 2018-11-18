import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretSort32 from '../../../es/caret--sort/32.js';

storiesOf('CaretSort32', module)
  .add('default', () => <CaretSort32 />)
  .add('with accessibility label', () => (
    <CaretSort32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretSort32 aria-label="Icon label">
      <title>Icon title</title>
    </CaretSort32>
  ));
