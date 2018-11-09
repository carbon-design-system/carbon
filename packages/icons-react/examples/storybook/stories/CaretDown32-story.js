import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretDown32 from '../../../lib/CaretDown/32';

storiesOf('CaretDown32', module)
  .add('default', () => <CaretDown32 />)
  .add('with accessibility label', () => (
    <CaretDown32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretDown32 focusable>
      <title>Icon title</title>
    </CaretDown32>
  ));
