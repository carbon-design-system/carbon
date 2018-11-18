import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_124 from '../../../es/number--small--1/24.js';

storiesOf('NumberSmall_124', module)
  .add('default', () => <NumberSmall_124 />)
  .add('with accessibility label', () => (
    <NumberSmall_124 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_124 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_124>
  ));
