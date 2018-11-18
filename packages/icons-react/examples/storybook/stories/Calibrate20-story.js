import React from 'react';
import { storiesOf } from '@storybook/react';
import Calibrate20 from '../../../es/calibrate/20.js';

storiesOf('Calibrate20', module)
  .add('default', () => <Calibrate20 />)
  .add('with accessibility label', () => (
    <Calibrate20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calibrate20 aria-label="Icon label">
      <title>Icon title</title>
    </Calibrate20>
  ));
