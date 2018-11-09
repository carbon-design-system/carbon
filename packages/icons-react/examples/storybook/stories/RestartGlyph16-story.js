import React from 'react';
import { storiesOf } from '@storybook/react';
import RestartGlyph16 from '../../../lib/RestartGlyph/16';

storiesOf('RestartGlyph16', module)
  .add('default', () => <RestartGlyph16 />)
  .add('with accessibility label', () => (
    <RestartGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RestartGlyph16 focusable>
      <title>Icon title</title>
    </RestartGlyph16>
  ));
