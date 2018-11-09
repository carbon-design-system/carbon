import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomIn32 from '../../../lib/ZoomIn/32';

storiesOf('ZoomIn32', module)
  .add('default', () => <ZoomIn32 />)
  .add('with accessibility label', () => (
    <ZoomIn32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomIn32 focusable>
      <title>Icon title</title>
    </ZoomIn32>
  ));
