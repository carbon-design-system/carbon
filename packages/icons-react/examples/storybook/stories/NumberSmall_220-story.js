import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_220 from '../../../es/number--small--2/20.js';

storiesOf('NumberSmall_220', module)
  .add('default', () => <NumberSmall_220 />)
  .add('with accessibility label', () => (
    <NumberSmall_220 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_220 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_220>
  ));
