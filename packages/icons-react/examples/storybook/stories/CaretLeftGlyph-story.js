import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretLeftGlyph from '../../../es/caret--left/index.js';

storiesOf('CaretLeftGlyph', module)
  .add('default', () => <CaretLeftGlyph />)
  .add('with accessibility label', () => (
    <CaretLeftGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretLeftGlyph aria-label="Icon label">
      <title>Icon title</title>
    </CaretLeftGlyph>
  ));
