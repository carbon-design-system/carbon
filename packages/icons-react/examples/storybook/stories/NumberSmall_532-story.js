import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_532 from '../../../es/number--small--5/32.js';

storiesOf('NumberSmall_532', module)
  .add('default', () => <NumberSmall_532 />)
  .add('with accessibility label', () => (
    <NumberSmall_532 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_532 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_532>
  ));
