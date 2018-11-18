import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_220 from '../../../es/number--2/20.js';

storiesOf('Number_220', module)
  .add('default', () => <Number_220 />)
  .add('with accessibility label', () => (
    <Number_220 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_220 aria-label="Icon label">
      <title>Icon title</title>
    </Number_220>
  ));
