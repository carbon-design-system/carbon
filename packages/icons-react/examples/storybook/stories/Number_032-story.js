import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_032 from '../../../es/number--0/32.js';

storiesOf('Number_032', module)
  .add('default', () => <Number_032 />)
  .add('with accessibility label', () => (
    <Number_032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_032 aria-label="Icon label">
      <title>Icon title</title>
    </Number_032>
  ));
