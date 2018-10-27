import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoOff32 from '../../../lib/video--off/32';

storiesOf('VideoOff32', module)
  .add('default', () => <VideoOff32 />)
  .add('with accessibility label', () => (
    <VideoOff32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoOff32 focusable>
      <title>Icon title</title>
    </VideoOff32>
  ));
