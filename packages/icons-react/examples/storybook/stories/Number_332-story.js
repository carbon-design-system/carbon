import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_332 from '../../../es/number--3/32.js';

storiesOf('Number_332', module)
  .add('default', () => <Number_332 />)
  .add('with accessibility label', () => (
    <Number_332 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_332 aria-label="Icon label">
      <title>Icon title</title>
    </Number_332>
  ));
