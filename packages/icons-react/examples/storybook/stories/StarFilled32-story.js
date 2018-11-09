import React from 'react';
import { storiesOf } from '@storybook/react';
import StarFilled32 from '../../../lib/StarFilled/32';

storiesOf('StarFilled32', module)
  .add('default', () => <StarFilled32 />)
  .add('with accessibility label', () => (
    <StarFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarFilled32 focusable>
      <title>Icon title</title>
    </StarFilled32>
  ));
