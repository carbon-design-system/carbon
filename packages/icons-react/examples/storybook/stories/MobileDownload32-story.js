import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileDownload32 from '../../../lib/MobileDownload/32';

storiesOf('MobileDownload32', module)
  .add('default', () => <MobileDownload32 />)
  .add('with accessibility label', () => (
    <MobileDownload32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileDownload32 focusable>
      <title>Icon title</title>
    </MobileDownload32>
  ));
