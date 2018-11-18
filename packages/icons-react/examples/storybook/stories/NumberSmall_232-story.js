import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_232 from '../../../es/number--small--2/32.js';

storiesOf('NumberSmall_232', module)
  .add('default', () => <NumberSmall_232 />)
  .add('with accessibility label', () => (
    <NumberSmall_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_232 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_232>
  ));
