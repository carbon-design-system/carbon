import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretUp24 from '../../../es/caret--up/24.js';

storiesOf('CaretUp24', module)
  .add('default', () => <CaretUp24 />)
  .add('with accessibility label', () => (
    <CaretUp24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretUp24 aria-label="Icon label">
      <title>Icon title</title>
    </CaretUp24>
  ));
