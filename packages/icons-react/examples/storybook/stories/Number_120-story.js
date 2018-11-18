import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_120 from '../../../es/number--1/20.js';

storiesOf('Number_120', module)
  .add('default', () => <Number_120 />)
  .add('with accessibility label', () => (
    <Number_120 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_120 aria-label="Icon label">
      <title>Icon title</title>
    </Number_120>
  ));
