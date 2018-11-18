import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeDown20 from '../../../es/volume--down/20.js';

storiesOf('VolumeDown20', module)
  .add('default', () => <VolumeDown20 />)
  .add('with accessibility label', () => (
    <VolumeDown20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeDown20 aria-label="Icon label">
      <title>Icon title</title>
    </VolumeDown20>
  ));
