import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeUp24 from '../../../es/volume--up/24.js';

storiesOf('VolumeUp24', module)
  .add('default', () => <VolumeUp24 />)
  .add('with accessibility label', () => (
    <VolumeUp24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeUp24 aria-label="Icon label">
      <title>Icon title</title>
    </VolumeUp24>
  ));
