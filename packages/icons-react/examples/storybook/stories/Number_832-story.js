import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_832 from '../../../es/number--8/32.js';

storiesOf('Number_832', module)
  .add('default', () => <Number_832 />)
  .add('with accessibility label', () => (
    <Number_832 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_832 aria-label="Icon label">
      <title>Icon title</title>
    </Number_832>
  ));
