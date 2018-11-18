import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_224 from '../../../es/number--2/24.js';

storiesOf('Number_224', module)
  .add('default', () => <Number_224 />)
  .add('with accessibility label', () => (
    <Number_224 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_224 aria-label="Icon label">
      <title>Icon title</title>
    </Number_224>
  ));
