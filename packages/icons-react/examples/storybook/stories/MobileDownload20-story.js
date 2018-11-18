import React from 'react';
import { storiesOf } from '@storybook/react';
import MobileDownload20 from '../../../es/mobile--download/20.js';

storiesOf('MobileDownload20', module)
  .add('default', () => <MobileDownload20 />)
  .add('with accessibility label', () => (
    <MobileDownload20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MobileDownload20 aria-label="Icon label">
      <title>Icon title</title>
    </MobileDownload20>
  ));
