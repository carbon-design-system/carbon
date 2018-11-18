import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronLeftGlyph from '../../../es/chevron--left/index.js';

storiesOf('ChevronLeftGlyph', module)
  .add('default', () => <ChevronLeftGlyph />)
  .add('with accessibility label', () => (
    <ChevronLeftGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronLeftGlyph aria-label="Icon label">
      <title>Icon title</title>
    </ChevronLeftGlyph>
  ));
