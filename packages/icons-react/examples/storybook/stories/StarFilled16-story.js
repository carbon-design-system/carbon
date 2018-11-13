import React from 'react';
import { storiesOf } from '@storybook/react';
import StarFilled16 from '../../../lib/StarFilled/16';

storiesOf('StarFilled16', module)
  .add('default', () => <StarFilled16 />)
  .add('with accessibility label', () => (
    <StarFilled16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarFilled16 focusable>
      <title>Icon title</title>
    </StarFilled16>
  ));
