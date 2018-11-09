import React from 'react';
import { storiesOf } from '@storybook/react';
import AddGlyph16 from '../../../lib/AddGlyph/16';

storiesOf('AddGlyph16', module)
  .add('default', () => <AddGlyph16 />)
  .add('with accessibility label', () => (
    <AddGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AddGlyph16 focusable>
      <title>Icon title</title>
    </AddGlyph16>
  ));
