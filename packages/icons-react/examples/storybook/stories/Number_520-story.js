import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_520 from '../../../es/number--5/20.js';

storiesOf('Number_520', module)
  .add('default', () => <Number_520 />)
  .add('with accessibility label', () => (
    <Number_520 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_520 aria-label="Icon label">
      <title>Icon title</title>
    </Number_520>
  ));
