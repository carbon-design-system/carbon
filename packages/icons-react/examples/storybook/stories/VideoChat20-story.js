import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoChat20 from '../../../es/video--chat/20.js';

storiesOf('VideoChat20', module)
  .add('default', () => <VideoChat20 />)
  .add('with accessibility label', () => (
    <VideoChat20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoChat20 aria-label="Icon label">
      <title>Icon title</title>
    </VideoChat20>
  ));
