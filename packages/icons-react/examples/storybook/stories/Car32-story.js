import React from 'react';
import { storiesOf } from '@storybook/react';
import Car32 from '../../../es/car/32.js';

storiesOf('Car32', module)
  .add('default', () => <Car32 />)
  .add('with accessibility label', () => (
    <Car32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Car32 aria-label="Icon label">
      <title>Icon title</title>
    </Car32>
  ));
