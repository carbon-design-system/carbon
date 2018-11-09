import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudRain32 from '../../../lib/CloudRain/32';

storiesOf('CloudRain32', module)
  .add('default', () => <CloudRain32 />)
  .add('with accessibility label', () => (
    <CloudRain32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudRain32 focusable>
      <title>Icon title</title>
    </CloudRain32>
  ));
