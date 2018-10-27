import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowVerticalGlyph from '../../../lib/overflow--vertical/glyph';

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
