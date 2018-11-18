import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomOut32 from '../../../es/zoom--out/32.js';

storiesOf('ZoomOut32', module)
  .add('default', () => <ZoomOut32 />)
  .add('with accessibility label', () => (
    <ZoomOut32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomOut32 aria-label="Icon label">
      <title>Icon title</title>
    </ZoomOut32>
  ));
