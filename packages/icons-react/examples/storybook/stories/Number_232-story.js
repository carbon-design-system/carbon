import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_232 from '../../../es/number--2/32.js';

storiesOf('Number_232', module)
  .add('default', () => <Number_232 />)
  .add('with accessibility label', () => (
    <Number_232 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_232 aria-label="Icon label">
      <title>Icon title</title>
    </Number_232>
  ));
