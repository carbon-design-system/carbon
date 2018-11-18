import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomIn24 from '../../../es/zoom--in/24.js';

storiesOf('ZoomIn24', module)
  .add('default', () => <ZoomIn24 />)
  .add('with accessibility label', () => (
    <ZoomIn24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomIn24 aria-label="Icon label">
      <title>Icon title</title>
    </ZoomIn24>
  ));
