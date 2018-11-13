import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomIn16 from '../../../lib/ZoomIn/16';

storiesOf('ZoomIn16', module)
  .add('default', () => <ZoomIn16 />)
  .add('with accessibility label', () => (
    <ZoomIn16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomIn16 focusable>
      <title>Icon title</title>
    </ZoomIn16>
  ));
