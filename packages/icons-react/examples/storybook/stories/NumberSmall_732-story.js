import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_732 from '../../../es/number--small--7/32.js';

storiesOf('NumberSmall_732', module)
  .add('default', () => <NumberSmall_732 />)
  .add('with accessibility label', () => (
    <NumberSmall_732 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_732 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_732>
  ));
