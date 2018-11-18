import React from 'react';
import { storiesOf } from '@storybook/react';
import NumberSmall_724 from '../../../es/number--small--7/24.js';

storiesOf('NumberSmall_724', module)
  .add('default', () => <NumberSmall_724 />)
  .add('with accessibility label', () => (
    <NumberSmall_724 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <NumberSmall_724 aria-label="Icon label">
      <title>Icon title</title>
    </NumberSmall_724>
  ));
