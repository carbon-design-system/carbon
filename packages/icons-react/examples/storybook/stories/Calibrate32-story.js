import React from 'react';
import { storiesOf } from '@storybook/react';
import Calibrate32 from '../../../lib/calibrate/32';

storiesOf('Calibrate32', module)
  .add('default', () => <Calibrate32 />)
  .add('with accessibility label', () => (
    <Calibrate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Calibrate32 focusable>
      <title>Icon title</title>
    </Calibrate32>
  ));
