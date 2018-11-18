import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_824 from '../../../es/number--small--8/24.js';

storiesOf('NumberSmall_824', module)
  .add('default', () => <NumberSmall_824 />)
  .add('with accessibility label', () => (
    <NumberSmall_824 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_824 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_824>
  ));
