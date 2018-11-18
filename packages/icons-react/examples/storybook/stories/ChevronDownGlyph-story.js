import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronDownGlyph from '../../../es/chevron--down/index.js';

storiesOf('ChevronDownGlyph', module)
  .add('default', () => <ChevronDownGlyph />)
  .add('with accessibility label', () => (
    <ChevronDownGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronDownGlyph aria-label="Icon label">
      <title>Icon title</title>
    </ChevronDownGlyph>
  ));
