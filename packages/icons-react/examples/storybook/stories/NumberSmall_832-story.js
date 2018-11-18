import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_832 from '../../../es/number--small--8/32.js';

storiesOf('NumberSmall_832', module)
  .add('default', () => <NumberSmall_832 />)
  .add('with accessibility label', () => (
    <NumberSmall_832 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_832 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_832>
  ));
