import React from 'react';
import { storiesOf } from '@storybook/react';
import DownToBottomGlyph from '../../../es/down-to-bottom/index.js';

storiesOf('DownToBottomGlyph', module)
  .add('default', () => <DownToBottomGlyph />)
  .add('with accessibility label', () => (
    <DownToBottomGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DownToBottomGlyph aria-label="Icon label">
      <title>Icon title</title>
    </DownToBottomGlyph>
  ));
