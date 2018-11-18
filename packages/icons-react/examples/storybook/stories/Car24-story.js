import React from 'react';
import { storiesOf } from '@storybook/react';
import Car24 from '../../../es/car/24.js';

storiesOf('Car24', module)
  .add('default', () => <Car24 />)
  .add('with accessibility label', () => (
    <Car24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Car24 aria-label="Icon label">
      <title>Icon title</title>
    </Car24>
  ));
