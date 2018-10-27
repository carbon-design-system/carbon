import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronUpGlyph from '../../../lib/chevron--up/glyph';

storiesOf('ChevronUpGlyph', module)
  .add('default', () => <ChevronUpGlyph />)
  .add('with accessibility label', () => (
    <ChevronUpGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronUpGlyph focusable>
      <title>Icon title</title>
    </ChevronUpGlyph>
  ));
