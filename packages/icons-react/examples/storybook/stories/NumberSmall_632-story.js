import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_632 from '../../../lib/NumberSmall_6/32';

storiesOf('NumberSmall_632', module)
  .add('default', () => <NumberSmall_632 />)
  .add('with accessibility label', () => (
    <NumberSmall_632 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_632 focusable>
      <title>Icon title</title>
    </NumberSmall_632>
  ));
