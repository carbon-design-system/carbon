import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretUpGlyph from '../../../lib/CaretUp/glyph';

storiesOf('CaretUpGlyph', module)
  .add('default', () => <CaretUpGlyph />)
  .add('with accessibility label', () => (
    <CaretUpGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretUpGlyph focusable>
      <title>Icon title</title>
    </CaretUpGlyph>
  ));
