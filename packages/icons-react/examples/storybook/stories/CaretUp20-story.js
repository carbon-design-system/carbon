import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretUp20 from '../../../es/caret--up/20.js';

storiesOf('CaretUp20', module)
  .add('default', () => <CaretUp20 />)
  .add('with accessibility label', () => (
    <CaretUp20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretUp20 aria-label="Icon label">
      <title>Icon title</title>
    </CaretUp20>
  ));
