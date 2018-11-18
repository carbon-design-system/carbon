import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoChat32 from '../../../es/video--chat/32.js';

storiesOf('VideoChat32', module)
  .add('default', () => <VideoChat32 />)
  .add('with accessibility label', () => (
    <VideoChat32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoChat32 aria-label="Icon label">
      <title>Icon title</title>
    </VideoChat32>
  ));
