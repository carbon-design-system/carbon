import React from 'react';
import { storiesOf } from '@storybook/react';
import StarHalf24 from '../../../es/star--half/24.js';

storiesOf('StarHalf24', module)
  .add('default', () => <StarHalf24 />)
  .add('with accessibility label', () => (
    <StarHalf24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarHalf24 aria-label="Icon label">
      <title>Icon title</title>
    </StarHalf24>
  ));
