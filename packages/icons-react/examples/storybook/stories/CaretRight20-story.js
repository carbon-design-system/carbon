import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretRight20 from '../../../es/caret--right/20.js';

storiesOf('CaretRight20', module)
  .add('default', () => <CaretRight20 />)
  .add('with accessibility label', () => (
    <CaretRight20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretRight20 aria-label="Icon label">
      <title>Icon title</title>
    </CaretRight20>
  ));
