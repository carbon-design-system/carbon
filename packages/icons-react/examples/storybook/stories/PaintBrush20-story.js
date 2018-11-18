import React from 'react';
import { storiesOf } from '@storybook/react';
import PaintBrush20 from '../../../es/paint-brush/20.js';

storiesOf('PaintBrush20', module)
  .add('default', () => <PaintBrush20 />)
  .add('with accessibility label', () => (
    <PaintBrush20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PaintBrush20 aria-label="Icon label">
      <title>Icon title</title>
    </PaintBrush20>
  ));
