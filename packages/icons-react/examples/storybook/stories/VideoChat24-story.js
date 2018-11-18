import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoChat24 from '../../../es/video--chat/24.js';

storiesOf('VideoChat24', module)
  .add('default', () => <VideoChat24 />)
  .add('with accessibility label', () => (
    <VideoChat24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoChat24 aria-label="Icon label">
      <title>Icon title</title>
    </VideoChat24>
  ));
