import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretSort32 from '../../../lib/CaretSort/32';

storiesOf('CaretSort32', module)
  .add('default', () => <CaretSort32 />)
  .add('with accessibility label', () => (
    <CaretSort32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretSort32 focusable>
      <title>Icon title</title>
    </CaretSort32>
  ));
