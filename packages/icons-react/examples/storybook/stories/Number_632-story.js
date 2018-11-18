import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_632 from '../../../es/number--6/32.js';

storiesOf('Number_632', module)
  .add('default', () => <Number_632 />)
  .add('with accessibility label', () => (
    <Number_632 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_632 aria-label="Icon label">
      <title>Icon title</title>
    </Number_632>
  ));
