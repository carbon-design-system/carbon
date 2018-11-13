import React from 'react';
import { storiesOf } from '@storybook/react';
import ZoomOut16 from '../../../lib/ZoomOut/16';

storiesOf('ZoomOut16', module)
  .add('default', () => <ZoomOut16 />)
  .add('with accessibility label', () => (
    <ZoomOut16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ZoomOut16 focusable>
      <title>Icon title</title>
    </ZoomOut16>
  ));
