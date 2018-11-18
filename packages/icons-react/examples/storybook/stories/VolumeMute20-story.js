import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeMute20 from '../../../es/volume--mute/20.js';

storiesOf('VolumeMute20', module)
  .add('default', () => <VolumeMute20 />)
  .add('with accessibility label', () => (
    <VolumeMute20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeMute20 aria-label="Icon label">
      <title>Icon title</title>
    </VolumeMute20>
  ));
