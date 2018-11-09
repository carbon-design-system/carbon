import React from 'react';
import { storiesOf } from '@storybook/react';
import DeleteGlyph16 from '../../../lib/DeleteGlyph/16';

storiesOf('DeleteGlyph16', module)
  .add('default', () => <DeleteGlyph16 />)
  .add('with accessibility label', () => (
    <DeleteGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DeleteGlyph16 focusable>
      <title>Icon title</title>
    </DeleteGlyph16>
  ));
