import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_132 from '../../../lib/NumberSmall_1/32';

storiesOf('NumberSmall_132', module)
  .add('default', () => <NumberSmall_132 />)
  .add('with accessibility label', () => (
    <NumberSmall_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_132 focusable>
      <title>Icon title</title>
    </NumberSmall_132>
  ));
