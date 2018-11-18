import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_120 from '../../../es/number--small--1/20.js';

storiesOf('NumberSmall_120', module)
  .add('default', () => <NumberSmall_120 />)
  .add('with accessibility label', () => (
    <NumberSmall_120 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_120 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_120>
  ));
