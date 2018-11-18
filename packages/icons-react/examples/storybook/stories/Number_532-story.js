import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_532 from '../../../es/number--5/32.js';

storiesOf('Number_532', module)
  .add('default', () => <Number_532 />)
  .add('with accessibility label', () => (
    <Number_532 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_532 aria-label="Icon label">
      <title>Icon title</title>
    </Number_532>
  ));
