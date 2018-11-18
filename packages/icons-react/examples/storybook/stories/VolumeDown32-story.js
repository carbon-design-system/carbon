import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeDown32 from '../../../es/volume--down/32.js';

storiesOf('VolumeDown32', module)
  .add('default', () => <VolumeDown32 />)
  .add('with accessibility label', () => (
    <VolumeDown32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeDown32 aria-label="Icon label">
      <title>Icon title</title>
    </VolumeDown32>
  ));
