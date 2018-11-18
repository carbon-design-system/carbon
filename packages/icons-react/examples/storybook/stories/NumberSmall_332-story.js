import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_332 from '../../../es/number--small--3/32.js';

storiesOf('NumberSmall_332', module)
  .add('default', () => <NumberSmall_332 />)
  .add('with accessibility label', () => (
    <NumberSmall_332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_332 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_332>
  ));
