import React from 'react';
import { storiesOf } from '@storybook/react';
import PaintBrush24 from '../../../es/paint-brush/24.js';

storiesOf('PaintBrush24', module)
  .add('default', () => <PaintBrush24 />)
  .add('with accessibility label', () => (
    <PaintBrush24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PaintBrush24 aria-label="Icon label">
      <title>Icon title</title>
    </PaintBrush24>
  ));
