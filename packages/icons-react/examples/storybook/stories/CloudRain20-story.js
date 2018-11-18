import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudRain20 from '../../../es/cloud--rain/20.js';

storiesOf('CloudRain20', module)
  .add('default', () => <CloudRain20 />)
  .add('with accessibility label', () => (
    <CloudRain20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudRain20 aria-label="Icon label">
      <title>Icon title</title>
    </CloudRain20>
  ));
