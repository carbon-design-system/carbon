import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudRain24 from '../../../es/cloud--rain/24.js';

storiesOf('CloudRain24', module)
  .add('default', () => <CloudRain24 />)
  .add('with accessibility label', () => (
    <CloudRain24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudRain24 aria-label="Icon label">
      <title>Icon title</title>
    </CloudRain24>
  ));
