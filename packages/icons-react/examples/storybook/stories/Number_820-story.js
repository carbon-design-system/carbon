import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_820 from '../../../es/number--8/20.js';

storiesOf('Number_820', module)
  .add('default', () => <Number_820 />)
  .add('with accessibility label', () => (
    <Number_820 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_820 aria-label="Icon label">
      <title>Icon title</title>
    </Number_820>
  ));
