import React from 'react';
import { storiesOf } from '@storybook/react';
import Car20 from '../../../es/car/20.js';

storiesOf('Car20', module)
  .add('default', () => <Car20 />)
  .add('with accessibility label', () => (
    <Car20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Car20 aria-label="Icon label">
      <title>Icon title</title>
    </Car20>
  ));
