import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronRightGlyph from '../../../lib/ChevronRight/glyph';

storiesOf('ChevronRightGlyph', module)
  .add('default', () => <ChevronRightGlyph />)
  .add('with accessibility label', () => (
    <ChevronRightGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronRightGlyph focusable>
      <title>Icon title</title>
    </ChevronRightGlyph>
  ));
