import React from 'react';
import { storiesOf } from '@storybook/react';
import DraggableGlyph from '../../../lib/Draggable/glyph';

storiesOf('DraggableGlyph', module)
  .add('default', () => <DraggableGlyph />)
  .add('with accessibility label', () => (
    <DraggableGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DraggableGlyph focusable>
      <title>Icon title</title>
    </DraggableGlyph>
  ));
