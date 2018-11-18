import React from 'react';
import { storiesOf } from '@storybook/react';
import OverflowVerticalGlyph from '../../../es/overflow--vertical/index.js';

storiesOf('OverflowVerticalGlyph', module)
  .add('default', () => <OverflowVerticalGlyph />)
  .add('with accessibility label', () => (
    <OverflowVerticalGlyph aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OverflowVerticalGlyph aria-label="Icon label">
      <title>Icon title</title>
    </OverflowVerticalGlyph>
  ));
