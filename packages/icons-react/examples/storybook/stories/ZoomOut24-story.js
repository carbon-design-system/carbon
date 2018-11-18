import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomOut24 from '../../../es/zoom--out/24.js';

storiesOf('ZoomOut24', module)
  .add('default', () => <ZoomOut24 />)
  .add('with accessibility label', () => (
    <ZoomOut24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomOut24 aria-label="Icon label">
      <title>Icon title</title>
    </ZoomOut24>
  ));
