import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_024 from '../../../es/number--0/24.js';

storiesOf('Number_024', module)
  .add('default', () => <Number_024 />)
  .add('with accessibility label', () => (
    <Number_024 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_024 aria-label="Icon label">
      <title>Icon title</title>
    </Number_024>
  ));
