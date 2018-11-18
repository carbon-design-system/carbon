import React from 'react';
import { storiesOf } from '@storybook/react';
import Video24 from '../../../es/video/24.js';

storiesOf('Video24', module)
  .add('default', () => <Video24 />)
  .add('with accessibility label', () => (
    <Video24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Video24 aria-label="Icon label">
      <title>Icon title</title>
    </Video24>
  ));
