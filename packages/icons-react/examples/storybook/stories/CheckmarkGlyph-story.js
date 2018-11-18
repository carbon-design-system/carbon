import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkGlyph from '../../../es/checkmark/index.js';

storiesOf('CheckmarkGlyph', module)
  .add('default', () => <CheckmarkGlyph />)
  .add('with accessibility label', () => (
    <CheckmarkGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkGlyph aria-label="Icon label">
      <title>Icon title</title>
    </CheckmarkGlyph>
  ));
