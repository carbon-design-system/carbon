import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowVerticalGlyph from '../../../lib/OverflowVertical/glyph';

storiesOf('OverflowVerticalGlyph', module)
  .add('default', () => <OverflowVerticalGlyph />)
  .add('with accessibility label', () => (
    <OverflowVerticalGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowVerticalGlyph focusable>
      <title>Icon title</title>
    </OverflowVerticalGlyph>
  ));
