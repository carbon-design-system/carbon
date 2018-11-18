import React from 'react';
import { storiesOf } from '@storybook/react';
import PaintBrush32 from '../../../es/paint-brush/32.js';

storiesOf('PaintBrush32', module)
  .add('default', () => <PaintBrush32 />)
  .add('with accessibility label', () => (
    <PaintBrush32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PaintBrush32 aria-label="Icon label">
      <title>Icon title</title>
    </PaintBrush32>
  ));
