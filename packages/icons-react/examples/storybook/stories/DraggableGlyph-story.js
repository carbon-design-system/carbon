import React from 'react';
import { storiesOf } from '@storybook/react';
import DraggableGlyph from '../../../es/draggable/index.js';

storiesOf('DraggableGlyph', module)
  .add('default', () => <DraggableGlyph />)
  .add('with accessibility label', () => (
    <DraggableGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DraggableGlyph aria-label="Icon label">
      <title>Icon title</title>
    </DraggableGlyph>
  ));
