import React from 'react';
import { storiesOf } from '@storybook/react';
import StarHalf20 from '../../../es/star--half/20.js';

storiesOf('StarHalf20', module)
  .add('default', () => <StarHalf20 />)
  .add('with accessibility label', () => (
    <StarHalf20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarHalf20 aria-label="Icon label">
      <title>Icon title</title>
    </StarHalf20>
  ));
