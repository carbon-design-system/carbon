import React from 'react';
import { storiesOf } from '@storybook/react';
import CopyGlyph16 from '../../../lib/copy--glyph/16';

storiesOf('CopyGlyph16', module)
  .add('default', () => <CopyGlyph16 />)
  .add('with accessibility label', () => (
    <CopyGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CopyGlyph16 focusable>
      <title>Icon title</title>
    </CopyGlyph16>
  ));
