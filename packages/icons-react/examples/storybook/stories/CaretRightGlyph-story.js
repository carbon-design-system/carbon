import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretRightGlyph from '../../../lib/CaretRight/glyph';

storiesOf('CaretRightGlyph', module)
  .add('default', () => <CaretRightGlyph />)
  .add('with accessibility label', () => (
    <CaretRightGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretRightGlyph focusable>
      <title>Icon title</title>
    </CaretRightGlyph>
  ));
