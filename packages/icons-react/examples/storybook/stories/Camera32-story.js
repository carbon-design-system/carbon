import React from 'react';
import { storiesOf } from '@storybook/react';
import Camera32 from '../../../lib/Camera/32';

storiesOf('Camera32', module)
  .add('default', () => <Camera32 />)
  .add('with accessibility label', () => (
    <Camera32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Camera32 focusable>
      <title>Icon title</title>
    </Camera32>
  ));
