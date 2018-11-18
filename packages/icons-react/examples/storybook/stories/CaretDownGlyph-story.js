import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretDownGlyph from '../../../es/caret--down/index.js';

storiesOf('CaretDownGlyph', module)
  .add('default', () => <CaretDownGlyph />)
  .add('with accessibility label', () => (
    <CaretDownGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretDownGlyph aria-label="Icon label">
      <title>Icon title</title>
    </CaretDownGlyph>
  ));
