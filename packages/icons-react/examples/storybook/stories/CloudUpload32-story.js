import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudUpload32 from '../../../es/cloud--upload/32.js';

storiesOf('CloudUpload32', module)
  .add('default', () => <CloudUpload32 />)
  .add('with accessibility label', () => (
    <CloudUpload32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudUpload32 aria-label="Icon label">
      <title>Icon title</title>
    </CloudUpload32>
  ));
