import React from 'react';
import { storiesOf } from '@storybook/react';
import CameraAction20 from '../../../es/camera--action/20.js';

storiesOf('CameraAction20', module)
  .add('default', () => <CameraAction20 />)
  .add('with accessibility label', () => (
    <CameraAction20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CameraAction20 aria-label="Icon label">
      <title>Icon title</title>
    </CameraAction20>
  ));
