import React from 'react';
import { storiesOf } from '@storybook/react';
import Car32 from '../../../lib/car/32';

storiesOf('Car32', module)
  .add('default', () => <Car32 />)
  .add('with accessibility label', () => (
    <Car32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Car32 focusable>
      <title>Icon title</title>
    </Car32>
  ));
