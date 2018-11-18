import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretLeft20 from '../../../es/caret--left/20.js';

storiesOf('CaretLeft20', module)
  .add('default', () => <CaretLeft20 />)
  .add('with accessibility label', () => (
    <CaretLeft20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretLeft20 aria-label="Icon label">
      <title>Icon title</title>
    </CaretLeft20>
  ));
