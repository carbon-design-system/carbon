import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronDownGlyph from '../../../lib/chevron--down/glyph';

storiesOf('ChevronDownGlyph', module)
  .add('default', () => <ChevronDownGlyph />)
  .add('with accessibility label', () => (
    <ChevronDownGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronDownGlyph focusable>
      <title>Icon title</title>
    </ChevronDownGlyph>
  ));
