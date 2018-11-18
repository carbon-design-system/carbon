import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudRain32 from '../../../es/cloud--rain/32.js';

storiesOf('CloudRain32', module)
  .add('default', () => <CloudRain32 />)
  .add('with accessibility label', () => (
    <CloudRain32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudRain32 aria-label="Icon label">
      <title>Icon title</title>
    </CloudRain32>
  ));
