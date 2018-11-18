import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_824 from '../../../es/number--8/24.js';

storiesOf('Number_824', module)
  .add('default', () => <Number_824 />)
  .add('with accessibility label', () => (
    <Number_824 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_824 aria-label="Icon label">
      <title>Icon title</title>
    </Number_824>
  ));
