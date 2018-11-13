import React from 'react';
import { storiesOf } from '@storybook/react';
import StarHalf16 from '../../../lib/StarHalf/16';

storiesOf('StarHalf16', module)
  .add('default', () => <StarHalf16 />)
  .add('with accessibility label', () => (
    <StarHalf16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarHalf16 focusable>
      <title>Icon title</title>
    </StarHalf16>
  ));
