import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronUpGlyph from '../../../es/chevron--up/index.js';

storiesOf('ChevronUpGlyph', module)
  .add('default', () => <ChevronUpGlyph />)
  .add('with accessibility label', () => (
    <ChevronUpGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronUpGlyph aria-label="Icon label">
      <title>Icon title</title>
    </ChevronUpGlyph>
  ));
