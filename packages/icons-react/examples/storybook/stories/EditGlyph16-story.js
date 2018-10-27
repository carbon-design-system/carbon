import React from 'react';
import { storiesOf } from '@storybook/react';
import EditGlyph16 from '../../../lib/edit--glyph/16';

storiesOf('EditGlyph16', module)
  .add('default', () => <EditGlyph16 />)
  .add('with accessibility label', () => (
    <EditGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <EditGlyph16 focusable>
      <title>Icon title</title>
    </EditGlyph16>
  ));
