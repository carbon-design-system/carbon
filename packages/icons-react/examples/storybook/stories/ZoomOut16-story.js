import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomOut16 from '../../../es/zoom--out/16.js';

storiesOf('ZoomOut16', module)
  .add('default', () => <ZoomOut16 />)
  .add('with accessibility label', () => (
    <ZoomOut16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomOut16 aria-label="Icon label">
      <title>Icon title</title>
    </ZoomOut16>
  ));
