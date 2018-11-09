import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudUpload32 from '../../../lib/CloudUpload/32';

storiesOf('CloudUpload32', module)
  .add('default', () => <CloudUpload32 />)
  .add('with accessibility label', () => (
    <CloudUpload32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudUpload32 focusable>
      <title>Icon title</title>
    </CloudUpload32>
  ));
