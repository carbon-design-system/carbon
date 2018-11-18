import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoOff32 from '../../../es/video--off/32.js';

storiesOf('VideoOff32', module)
  .add('default', () => <VideoOff32 />)
  .add('with accessibility label', () => (
    <VideoOff32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoOff32 aria-label="Icon label">
      <title>Icon title</title>
    </VideoOff32>
  ));
