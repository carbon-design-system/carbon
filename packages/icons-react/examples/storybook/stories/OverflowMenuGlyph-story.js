import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuGlyph from '../../../lib/OverflowMenu/glyph';

storiesOf('OverflowMenuGlyph', module)
  .add('default', () => <OverflowMenuGlyph />)
  .add('with accessibility label', () => (
    <OverflowMenuGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuGlyph focusable>
      <title>Icon title</title>
    </OverflowMenuGlyph>
  ));
