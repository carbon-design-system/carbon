import React from 'react';
import { storiesOf } from '@storybook/react';
import Video32 from '../../../es/video/32.js';

storiesOf('Video32', module)
  .add('default', () => <Video32 />)
  .add('with accessibility label', () => (
    <Video32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Video32 aria-label="Icon label">
      <title>Icon title</title>
    </Video32>
  ));
