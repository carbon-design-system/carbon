import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomIn16 from '../../../es/zoom--in/16.js';

storiesOf('ZoomIn16', module)
  .add('default', () => <ZoomIn16 />)
  .add('with accessibility label', () => (
    <ZoomIn16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomIn16 aria-label="Icon label">
      <title>Icon title</title>
    </ZoomIn16>
  ));
