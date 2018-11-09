import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_532 from '../../../lib/NumberSmall_5/32';

storiesOf('NumberSmall_532', module)
  .add('default', () => <NumberSmall_532 />)
  .add('with accessibility label', () => (
    <NumberSmall_532 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_532 focusable>
      <title>Icon title</title>
    </NumberSmall_532>
  ));
