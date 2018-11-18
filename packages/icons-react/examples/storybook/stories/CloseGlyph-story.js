import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseGlyph from '../../../es/close/index.js';

storiesOf('CloseGlyph', module)
  .add('default', () => <CloseGlyph />)
  .add('with accessibility label', () => (
    <CloseGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloseGlyph aria-label="Icon label">
      <title>Icon title</title>
    </CloseGlyph>
  ));
