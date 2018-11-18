import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_724 from '../../../es/number--7/24.js';

storiesOf('Number_724', module)
  .add('default', () => <Number_724 />)
  .add('with accessibility label', () => (
    <Number_724 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_724 aria-label="Icon label">
      <title>Icon title</title>
    </Number_724>
  ));
