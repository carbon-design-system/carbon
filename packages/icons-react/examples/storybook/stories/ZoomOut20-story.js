import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomOut20 from '../../../es/zoom--out/20.js';

storiesOf('ZoomOut20', module)
  .add('default', () => <ZoomOut20 />)
  .add('with accessibility label', () => (
    <ZoomOut20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomOut20 aria-label="Icon label">
      <title>Icon title</title>
    </ZoomOut20>
  ));
