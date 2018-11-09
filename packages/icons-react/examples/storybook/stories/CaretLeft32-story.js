import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretLeft32 from '../../../lib/CaretLeft/32';

storiesOf('CaretLeft32', module)
  .add('default', () => <CaretLeft32 />)
  .add('with accessibility label', () => (
    <CaretLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretLeft32 focusable>
      <title>Icon title</title>
    </CaretLeft32>
  ));
