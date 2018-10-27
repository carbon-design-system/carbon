import React from 'react';
import { storiesOf } from '@storybook/react';
import DownToBottomGlyph from '../../../lib/down-to-bottom/glyph';

storiesOf('DownToBottomGlyph', module)
  .add('default', () => <DownToBottomGlyph />)
  .add('with accessibility label', () => (
    <DownToBottomGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DownToBottomGlyph focusable>
      <title>Icon title</title>
    </DownToBottomGlyph>
  ));
