import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeUp32 from '../../../es/volume--up/32.js';

storiesOf('VolumeUp32', module)
  .add('default', () => <VolumeUp32 />)
  .add('with accessibility label', () => (
    <VolumeUp32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeUp32 aria-label="Icon label">
      <title>Icon title</title>
    </VolumeUp32>
  ));
