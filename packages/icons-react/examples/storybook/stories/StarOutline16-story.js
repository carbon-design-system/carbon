import React from 'react';
import { storiesOf } from '@storybook/react';
import StarOutline16 from '../../../lib/StarOutline/16';

storiesOf('StarOutline16', module)
  .add('default', () => <StarOutline16 />)
  .add('with accessibility label', () => (
    <StarOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StarOutline16 focusable>
      <title>Icon title</title>
    </StarOutline16>
  ));
