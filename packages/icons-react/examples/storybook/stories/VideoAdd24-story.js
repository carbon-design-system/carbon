import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoAdd24 from '../../../es/video--add/24.js';

storiesOf('VideoAdd24', module)
  .add('default', () => <VideoAdd24 />)
  .add('with accessibility label', () => (
    <VideoAdd24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoAdd24 aria-label="Icon label">
      <title>Icon title</title>
    </VideoAdd24>
  ));
