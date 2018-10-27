import React from 'react';
import { storiesOf } from '@storybook/react';
import DownloadGlyph16 from '../../../lib/download--glyph/16';

storiesOf('DownloadGlyph16', module)
  .add('default', () => <DownloadGlyph16 />)
  .add('with accessibility label', () => (
    <DownloadGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DownloadGlyph16 focusable>
      <title>Icon title</title>
    </DownloadGlyph16>
  ));
