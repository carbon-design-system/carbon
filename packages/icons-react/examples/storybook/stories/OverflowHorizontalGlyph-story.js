import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowHorizontalGlyph from '../../../es/overflow--horizontal/index.js';

storiesOf('OverflowHorizontalGlyph', module)
  .add('default', () => <OverflowHorizontalGlyph />)
  .add('with accessibility label', () => (
    <OverflowHorizontalGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowHorizontalGlyph aria-label="Icon label">
      <title>Icon title</title>
    </OverflowHorizontalGlyph>
  ));
