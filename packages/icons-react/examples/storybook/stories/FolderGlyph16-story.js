import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderGlyph16 from '../../../lib/folder--glyph/16';

storiesOf('FolderGlyph16', module)
  .add('default', () => <FolderGlyph16 />)
  .add('with accessibility label', () => (
    <FolderGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FolderGlyph16 focusable>
      <title>Icon title</title>
    </FolderGlyph16>
  ));
