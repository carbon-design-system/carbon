import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoAdd32 from '../../../lib/video--add/32';

storiesOf('VideoAdd32', module)
  .add('default', () => <VideoAdd32 />)
  .add('with accessibility label', () => (
    <VideoAdd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoAdd32 focusable>
      <title>Icon title</title>
    </VideoAdd32>
  ));
