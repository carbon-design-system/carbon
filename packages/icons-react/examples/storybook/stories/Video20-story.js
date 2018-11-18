import React from 'react';
import { storiesOf } from '@storybook/react';
import Video20 from '../../../es/video/20.js';

storiesOf('Video20', module)
  .add('default', () => <Video20 />)
  .add('with accessibility label', () => (
    <Video20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Video20 aria-label="Icon label">
      <title>Icon title</title>
    </Video20>
  ));
