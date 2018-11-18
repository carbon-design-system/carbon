import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretDown20 from '../../../es/caret--down/20.js';

storiesOf('CaretDown20', module)
  .add('default', () => <CaretDown20 />)
  .add('with accessibility label', () => (
    <CaretDown20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretDown20 aria-label="Icon label">
      <title>Icon title</title>
    </CaretDown20>
  ));
