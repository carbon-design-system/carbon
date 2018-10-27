import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowHorizontalGlyph from '../../../lib/overflow--horizontal/glyph';

storiesOf('OverflowHorizontalGlyph', module)
  .add('default', () => <OverflowHorizontalGlyph />)
  .add('with accessibility label', () => (
    <OverflowHorizontalGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowHorizontalGlyph focusable>
      <title>Icon title</title>
    </OverflowHorizontalGlyph>
  ));
