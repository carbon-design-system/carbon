import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoChat32 from '../../../lib/video--chat/32';

storiesOf('VideoChat32', module)
  .add('default', () => <VideoChat32 />)
  .add('with accessibility label', () => (
    <VideoChat32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoChat32 focusable>
      <title>Icon title</title>
    </VideoChat32>
  ));
