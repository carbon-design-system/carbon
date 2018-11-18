import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretLeft24 from '../../../es/caret--left/24.js';

storiesOf('CaretLeft24', module)
  .add('default', () => <CaretLeft24 />)
  .add('with accessibility label', () => (
    <CaretLeft24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretLeft24 aria-label="Icon label">
      <title>Icon title</title>
    </CaretLeft24>
  ));
