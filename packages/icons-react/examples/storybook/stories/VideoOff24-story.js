import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoOff24 from '../../../es/video--off/24.js';

storiesOf('VideoOff24', module)
  .add('default', () => <VideoOff24 />)
  .add('with accessibility label', () => (
    <VideoOff24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoOff24 aria-label="Icon label">
      <title>Icon title</title>
    </VideoOff24>
  ));
