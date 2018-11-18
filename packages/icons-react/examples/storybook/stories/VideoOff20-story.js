import React from 'react';
import { storiesOf } from '@storybook/react';
import VideoOff20 from '../../../es/video--off/20.js';

storiesOf('VideoOff20', module)
  .add('default', () => <VideoOff20 />)
  .add('with accessibility label', () => (
    <VideoOff20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VideoOff20 aria-label="Icon label">
      <title>Icon title</title>
    </VideoOff20>
  ));
