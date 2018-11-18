import React from 'react';
import { storiesOf } from '@storybook/react';
import Camera32 from '../../../es/camera/32.js';

storiesOf('Camera32', module)
  .add('default', () => <Camera32 />)
  .add('with accessibility label', () => (
    <Camera32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Camera32 aria-label="Icon label">
      <title>Icon title</title>
    </Camera32>
  ));
