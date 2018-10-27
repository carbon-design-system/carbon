import React from 'react';
import { storiesOf } from '@storybook/react';
import UpToTopGlyph from '../../../lib/up-to-top/glyph';

storiesOf('UpToTopGlyph', module)
  .add('default', () => <UpToTopGlyph />)
  .add('with accessibility label', () => (
    <UpToTopGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UpToTopGlyph focusable>
      <title>Icon title</title>
    </UpToTopGlyph>
  ));
