import React from 'react';
import { storiesOf } from '@storybook/react';
import CameraAction24 from '../../../es/camera--action/24.js';

storiesOf('CameraAction24', module)
  .add('default', () => <CameraAction24 />)
  .add('with accessibility label', () => (
    <CameraAction24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CameraAction24 aria-label="Icon label">
      <title>Icon title</title>
    </CameraAction24>
  ));
