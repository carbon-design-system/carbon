import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_424 from '../../../es/number--4/24.js';

storiesOf('Number_424', module)
  .add('default', () => <Number_424 />)
  .add('with accessibility label', () => (
    <Number_424 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_424 aria-label="Icon label">
      <title>Icon title</title>
    </Number_424>
  ));
