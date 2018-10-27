import React from 'react';
import { storiesOf } from '@storybook/react';
import StarHalf32 from '../../../lib/star--half/32';

storiesOf('StarHalf32', module)
  .add('default', () => <StarHalf32 />)
  .add('with accessibility label', () => (
    <StarHalf32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarHalf32 focusable>
      <title>Icon title</title>
    </StarHalf32>
  ));
