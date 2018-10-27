import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_832 from '../../../lib/number--small--8/32';

storiesOf('NumberSmall_832', module)
  .add('default', () => <NumberSmall_832 />)
  .add('with accessibility label', () => (
    <NumberSmall_832 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_832 focusable>
      <title>Icon title</title>
    </NumberSmall_832>
  ));
