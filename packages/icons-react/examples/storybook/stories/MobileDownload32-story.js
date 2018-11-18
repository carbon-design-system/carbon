import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileDownload32 from '../../../es/mobile--download/32.js';

storiesOf('MobileDownload32', module)
  .add('default', () => <MobileDownload32 />)
  .add('with accessibility label', () => (
    <MobileDownload32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileDownload32 aria-label="Icon label">
      <title>Icon title</title>
    </MobileDownload32>
  ));
