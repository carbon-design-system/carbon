import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretRight32 from '../../../lib/caret--right/32';

storiesOf('CaretRight32', module)
  .add('default', () => <CaretRight32 />)
  .add('with accessibility label', () => (
    <CaretRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretRight32 focusable>
      <title>Icon title</title>
    </CaretRight32>
  ));
