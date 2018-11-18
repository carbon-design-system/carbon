import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretLeft32 from '../../../es/caret--left/32.js';

storiesOf('CaretLeft32', module)
  .add('default', () => <CaretLeft32 />)
  .add('with accessibility label', () => (
    <CaretLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretLeft32 aria-label="Icon label">
      <title>Icon title</title>
    </CaretLeft32>
  ));
