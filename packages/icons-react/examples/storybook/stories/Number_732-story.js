import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_732 from '../../../es/number--7/32.js';

storiesOf('Number_732', module)
  .add('default', () => <Number_732 />)
  .add('with accessibility label', () => (
    <Number_732 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_732 aria-label="Icon label">
      <title>Icon title</title>
    </Number_732>
  ));
