import React from 'react';
import { storiesOf } from '@storybook/react';
import StarHalf16 from '../../../es/star--half/16.js';

storiesOf('StarHalf16', module)
  .add('default', () => <StarHalf16 />)
  .add('with accessibility label', () => (
    <StarHalf16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarHalf16 aria-label="Icon label">
      <title>Icon title</title>
    </StarHalf16>
  ));
