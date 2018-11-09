import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseGlyph from '../../../lib/Close/glyph';

storiesOf('CloseGlyph', module)
  .add('default', () => <CloseGlyph />)
  .add('with accessibility label', () => (
    <CloseGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloseGlyph focusable>
      <title>Icon title</title>
    </CloseGlyph>
  ));
