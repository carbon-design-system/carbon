import React from 'react';
import { storiesOf } from '@storybook/react';
import Camera24 from '../../../es/camera/24.js';

storiesOf('Camera24', module)
  .add('default', () => <Camera24 />)
  .add('with accessibility label', () => (
    <Camera24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Camera24 aria-label="Icon label">
      <title>Icon title</title>
    </Camera24>
  ));
