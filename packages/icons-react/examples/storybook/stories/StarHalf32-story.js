import React from 'react';
import { storiesOf } from '@storybook/react';
import StarHalf32 from '../../../es/star--half/32.js';

storiesOf('StarHalf32', module)
  .add('default', () => <StarHalf32 />)
  .add('with accessibility label', () => (
    <StarHalf32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarHalf32 aria-label="Icon label">
      <title>Icon title</title>
    </StarHalf32>
  ));
