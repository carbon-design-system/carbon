import React from 'react';
import { storiesOf } from '@storybook/react';
import UpToTopGlyph from '../../../es/up-to-top/index.js';

storiesOf('UpToTopGlyph', module)
  .add('default', () => <UpToTopGlyph />)
  .add('with accessibility label', () => (
    <UpToTopGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <UpToTopGlyph aria-label="Icon label">
      <title>Icon title</title>
    </UpToTopGlyph>
  ));
