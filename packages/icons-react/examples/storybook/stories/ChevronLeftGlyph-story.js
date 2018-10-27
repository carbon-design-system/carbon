import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronLeftGlyph from '../../../lib/chevron--left/glyph';

storiesOf('ChevronLeftGlyph', module)
  .add('default', () => <ChevronLeftGlyph />)
  .add('with accessibility label', () => (
    <ChevronLeftGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronLeftGlyph focusable>
      <title>Icon title</title>
    </ChevronLeftGlyph>
  ));
