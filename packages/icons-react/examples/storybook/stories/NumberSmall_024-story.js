import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_024 from '../../../es/number--small--0/24.js';

storiesOf('NumberSmall_024', module)
  .add('default', () => <NumberSmall_024 />)
  .add('with accessibility label', () => (
    <NumberSmall_024 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_024 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_024>
  ));
