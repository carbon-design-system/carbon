import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretDownGlyph from '../../../lib/caret--down/glyph';

storiesOf('CaretDownGlyph', module)
  .add('default', () => <CaretDownGlyph />)
  .add('with accessibility label', () => (
    <CaretDownGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretDownGlyph focusable>
      <title>Icon title</title>
    </CaretDownGlyph>
  ));
