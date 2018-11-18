import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_624 from '../../../es/number--6/24.js';

storiesOf('Number_624', module)
  .add('default', () => <Number_624 />)
  .add('with accessibility label', () => (
    <Number_624 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_624 aria-label="Icon label">
      <title>Icon title</title>
    </Number_624>
  ));
