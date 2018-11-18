import React from 'react';
import { storiesOf } from '@storybook/react';
import CameraAction32 from '../../../es/camera--action/32.js';

storiesOf('CameraAction32', module)
  .add('default', () => <CameraAction32 />)
  .add('with accessibility label', () => (
    <CameraAction32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CameraAction32 aria-label="Icon label">
      <title>Icon title</title>
    </CameraAction32>
  ));
