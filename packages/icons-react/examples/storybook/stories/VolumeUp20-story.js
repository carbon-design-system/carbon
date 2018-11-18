import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeUp20 from '../../../es/volume--up/20.js';

storiesOf('VolumeUp20', module)
  .add('default', () => <VolumeUp20 />)
  .add('with accessibility label', () => (
    <VolumeUp20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeUp20 aria-label="Icon label">
      <title>Icon title</title>
    </VolumeUp20>
  ));
