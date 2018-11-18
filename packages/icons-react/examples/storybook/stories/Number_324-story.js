import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_324 from '../../../es/number--3/24.js';

storiesOf('Number_324', module)
  .add('default', () => <Number_324 />)
  .add('with accessibility label', () => (
    <Number_324 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_324 aria-label="Icon label">
      <title>Icon title</title>
    </Number_324>
  ));
