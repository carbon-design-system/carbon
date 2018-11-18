import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoAdd20 from '../../../es/video--add/20.js';

storiesOf('VideoAdd20', module)
  .add('default', () => <VideoAdd20 />)
  .add('with accessibility label', () => (
    <VideoAdd20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoAdd20 aria-label="Icon label">
      <title>Icon title</title>
    </VideoAdd20>
  ));
