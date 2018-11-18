import React from 'react';
import { storiesOf } from '@storybook/react';
import Calibrate24 from '../../../es/calibrate/24.js';

storiesOf('Calibrate24', module)
  .add('default', () => <Calibrate24 />)
  .add('with accessibility label', () => (
    <Calibrate24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calibrate24 aria-label="Icon label">
      <title>Icon title</title>
    </Calibrate24>
  ));
