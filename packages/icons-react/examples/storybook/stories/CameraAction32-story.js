import React from 'react';
import { storiesOf } from '@storybook/react';
import CameraAction32 from '../../../lib/camera--action/32';

storiesOf('CameraAction32', module)
  .add('default', () => <CameraAction32 />)
  .add('with accessibility label', () => (
    <CameraAction32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CameraAction32 focusable>
      <title>Icon title</title>
    </CameraAction32>
  ));
