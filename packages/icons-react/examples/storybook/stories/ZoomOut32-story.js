import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomOut32 from '../../../lib/ZoomOut/32';

storiesOf('ZoomOut32', module)
  .add('default', () => <ZoomOut32 />)
  .add('with accessibility label', () => (
    <ZoomOut32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomOut32 focusable>
      <title>Icon title</title>
    </ZoomOut32>
  ));
