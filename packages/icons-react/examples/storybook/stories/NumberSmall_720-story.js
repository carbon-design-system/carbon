import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_720 from '../../../es/number--small--7/20.js';

storiesOf('NumberSmall_720', module)
  .add('default', () => <NumberSmall_720 />)
  .add('with accessibility label', () => (
    <NumberSmall_720 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_720 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_720>
  ));
