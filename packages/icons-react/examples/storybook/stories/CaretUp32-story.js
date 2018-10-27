import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretUp32 from '../../../lib/caret--up/32';

storiesOf('CaretUp32', module)
  .add('default', () => <CaretUp32 />)
  .add('with accessibility label', () => (
    <CaretUp32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretUp32 focusable>
      <title>Icon title</title>
    </CaretUp32>
  ));
