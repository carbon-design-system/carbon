import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_720 from '../../../es/number--7/20.js';

storiesOf('Number_720', module)
  .add('default', () => <Number_720 />)
  .add('with accessibility label', () => (
    <Number_720 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_720 aria-label="Icon label">
      <title>Icon title</title>
    </Number_720>
  ));
