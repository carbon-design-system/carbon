import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseGlyph16 from '../../../lib/PauseGlyph/16';

storiesOf('PauseGlyph16', module)
  .add('default', () => <PauseGlyph16 />)
  .add('with accessibility label', () => (
    <PauseGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseGlyph16 focusable>
      <title>Icon title</title>
    </PauseGlyph16>
  ));
