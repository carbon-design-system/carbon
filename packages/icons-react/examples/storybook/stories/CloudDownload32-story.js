import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudDownload32 from '../../../es/cloud--download/32.js';

storiesOf('CloudDownload32', module)
  .add('default', () => <CloudDownload32 />)
  .add('with accessibility label', () => (
    <CloudDownload32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudDownload32 aria-label="Icon label">
      <title>Icon title</title>
    </CloudDownload32>
  ));
