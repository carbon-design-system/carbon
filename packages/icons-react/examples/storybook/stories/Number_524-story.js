import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_524 from '../../../es/number--5/24.js';

storiesOf('Number_524', module)
  .add('default', () => <Number_524 />)
  .add('with accessibility label', () => (
    <Number_524 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_524 aria-label="Icon label">
      <title>Icon title</title>
    </Number_524>
  ));
