import React from 'react';
import { storiesOf } from '@storybook/react';
import Calibrate32 from '../../../es/calibrate/32.js';

storiesOf('Calibrate32', module)
  .add('default', () => <Calibrate32 />)
  .add('with accessibility label', () => (
    <Calibrate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calibrate32 aria-label="Icon label">
      <title>Icon title</title>
    </Calibrate32>
  ));
