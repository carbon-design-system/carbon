import React from 'react';
import { storiesOf } from '@storybook/react';
import FilterGlyph16 from '../../../lib/filter--glyph/16';

storiesOf('FilterGlyph16', module)
  .add('default', () => <FilterGlyph16 />)
  .add('with accessibility label', () => (
    <FilterGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FilterGlyph16 focusable>
      <title>Icon title</title>
    </FilterGlyph16>
  ));
