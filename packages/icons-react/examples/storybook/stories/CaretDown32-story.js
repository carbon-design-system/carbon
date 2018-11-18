import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretDown32 from '../../../es/caret--down/32.js';

storiesOf('CaretDown32', module)
  .add('default', () => <CaretDown32 />)
  .add('with accessibility label', () => (
    <CaretDown32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretDown32 aria-label="Icon label">
      <title>Icon title</title>
    </CaretDown32>
  ));
