import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_124 from '../../../es/number--1/24.js';

storiesOf('Number_124', module)
  .add('default', () => <Number_124 />)
  .add('with accessibility label', () => (
    <Number_124 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_124 aria-label="Icon label">
      <title>Icon title</title>
    </Number_124>
  ));
