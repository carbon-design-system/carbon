import React from 'react';
import { storiesOf } from '@storybook/react';
import Camera20 from '../../../es/camera/20.js';

storiesOf('Camera20', module)
  .add('default', () => <Camera20 />)
  .add('with accessibility label', () => (
    <Camera20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Camera20 aria-label="Icon label">
      <title>Icon title</title>
    </Camera20>
  ));
