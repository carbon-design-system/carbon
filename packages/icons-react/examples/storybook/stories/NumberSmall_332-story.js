import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_332 from '../../../lib/number--small--3/32';

storiesOf('NumberSmall_332', module)
  .add('default', () => <NumberSmall_332 />)
  .add('with accessibility label', () => (
    <NumberSmall_332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_332 focusable>
      <title>Icon title</title>
    </NumberSmall_332>
  ));
