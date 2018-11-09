import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkGlyph from '../../../lib/Checkmark/glyph';

storiesOf('CheckmarkGlyph', module)
  .add('default', () => <CheckmarkGlyph />)
  .add('with accessibility label', () => (
    <CheckmarkGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkGlyph focusable>
      <title>Icon title</title>
    </CheckmarkGlyph>
  ));
