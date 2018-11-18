import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileDownload24 from '../../../es/mobile--download/24.js';

storiesOf('MobileDownload24', module)
  .add('default', () => <MobileDownload24 />)
  .add('with accessibility label', () => (
    <MobileDownload24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileDownload24 aria-label="Icon label">
      <title>Icon title</title>
    </MobileDownload24>
  ));
