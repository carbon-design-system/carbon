import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowMenuGlyph from '../../../es/overflow-menu/index.js';

storiesOf('OverflowMenuGlyph', module)
  .add('default', () => <OverflowMenuGlyph />)
  .add('with accessibility label', () => (
    <OverflowMenuGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowMenuGlyph aria-label="Icon label">
      <title>Icon title</title>
    </OverflowMenuGlyph>
  ));
