import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudDownload32 from '../../../lib/cloud--download/32';

storiesOf('CloudDownload32', module)
  .add('default', () => <CloudDownload32 />)
  .add('with accessibility label', () => (
    <CloudDownload32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudDownload32 focusable>
      <title>Icon title</title>
    </CloudDownload32>
  ));
