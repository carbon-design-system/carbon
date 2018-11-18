import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoAdd32 from '../../../es/video--add/32.js';

storiesOf('VideoAdd32', module)
  .add('default', () => <VideoAdd32 />)
  .add('with accessibility label', () => (
    <VideoAdd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoAdd32 aria-label="Icon label">
      <title>Icon title</title>
    </VideoAdd32>
  ));
