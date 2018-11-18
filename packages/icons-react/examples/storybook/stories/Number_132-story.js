import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_132 from '../../../es/number--1/32.js';

storiesOf('Number_132', module)
  .add('default', () => <Number_132 />)
  .add('with accessibility label', () => (
    <Number_132 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_132 aria-label="Icon label">
      <title>Icon title</title>
    </Number_132>
  ));
