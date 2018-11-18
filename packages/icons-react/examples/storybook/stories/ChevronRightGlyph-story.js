import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronRightGlyph from '../../../es/chevron--right/index.js';

storiesOf('ChevronRightGlyph', module)
  .add('default', () => <ChevronRightGlyph />)
  .add('with accessibility label', () => (
    <ChevronRightGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronRightGlyph aria-label="Icon label">
      <title>Icon title</title>
    </ChevronRightGlyph>
  ));
