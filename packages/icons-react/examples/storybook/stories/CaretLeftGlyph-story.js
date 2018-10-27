import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretLeftGlyph from '../../../lib/caret--left/glyph';

storiesOf('CaretLeftGlyph', module)
  .add('default', () => <CaretLeftGlyph />)
  .add('with accessibility label', () => (
    <CaretLeftGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretLeftGlyph focusable>
      <title>Icon title</title>
    </CaretLeftGlyph>
  ));
