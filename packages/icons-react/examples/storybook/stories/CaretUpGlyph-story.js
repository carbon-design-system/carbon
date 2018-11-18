import React from 'react';
import { storiesOf } from '@storybook/react';
import CaretUpGlyph from '../../../es/caret--up/index.js';

storiesOf('CaretUpGlyph', module)
  .add('default', () => <CaretUpGlyph />)
  .add('with accessibility label', () => (
    <CaretUpGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CaretUpGlyph aria-label="Icon label">
      <title>Icon title</title>
    </CaretUpGlyph>
  ));
