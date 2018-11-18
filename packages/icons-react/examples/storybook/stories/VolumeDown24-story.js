import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeDown24 from '../../../es/volume--down/24.js';

storiesOf('VolumeDown24', module)
  .add('default', () => <VolumeDown24 />)
  .add('with accessibility label', () => (
    <VolumeDown24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeDown24 aria-label="Icon label">
      <title>Icon title</title>
    </VolumeDown24>
  ));
