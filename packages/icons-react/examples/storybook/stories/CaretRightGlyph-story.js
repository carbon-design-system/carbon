import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretRightGlyph from '../../../es/caret--right/index.js';

storiesOf('CaretRightGlyph', module)
  .add('default', () => <CaretRightGlyph />)
  .add('with accessibility label', () => (
    <CaretRightGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretRightGlyph aria-label="Icon label">
      <title>Icon title</title>
    </CaretRightGlyph>
  ));
