import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchGlyph16 from '../../../lib/SearchGlyph/16';

storiesOf('SearchGlyph16', module)
  .add('default', () => <SearchGlyph16 />)
  .add('with accessibility label', () => (
    <SearchGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SearchGlyph16 focusable>
      <title>Icon title</title>
    </SearchGlyph16>
  ));
