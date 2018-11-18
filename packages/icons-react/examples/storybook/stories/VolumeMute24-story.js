import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeMute24 from '../../../es/volume--mute/24.js';

storiesOf('VolumeMute24', module)
  .add('default', () => <VolumeMute24 />)
  .add('with accessibility label', () => (
    <VolumeMute24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeMute24 aria-label="Icon label">
      <title>Icon title</title>
    </VolumeMute24>
  ));
