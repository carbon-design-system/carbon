import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomIn32 from '../../../es/zoom--in/32.js';

storiesOf('ZoomIn32', module)
  .add('default', () => <ZoomIn32 />)
  .add('with accessibility label', () => (
    <ZoomIn32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomIn32 aria-label="Icon label">
      <title>Icon title</title>
    </ZoomIn32>
  ));
