import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseGlyph16 from '../../../lib/CloseGlyph/16';

storiesOf('CloseGlyph16', module)
  .add('default', () => <CloseGlyph16 />)
  .add('with accessibility label', () => (
    <CloseGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloseGlyph16 focusable>
      <title>Icon title</title>
    </CloseGlyph16>
  ));
