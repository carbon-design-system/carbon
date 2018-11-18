import React from 'react';
import { storiesOf } from '@storybook/react';
import StarFilled32 from '../../../es/star--filled/32.js';

storiesOf('StarFilled32', module)
  .add('default', () => <StarFilled32 />)
  .add('with accessibility label', () => (
    <StarFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </StarFilled32>
  ));
