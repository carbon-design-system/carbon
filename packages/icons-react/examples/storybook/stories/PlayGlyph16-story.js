import React from 'react';
import { storiesOf } from '@storybook/react';
import PlayGlyph16 from '../../../lib/PlayGlyph/16';

storiesOf('PlayGlyph16', module)
  .add('default', () => <PlayGlyph16 />)
  .add('with accessibility label', () => (
    <PlayGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PlayGlyph16 focusable>
      <title>Icon title</title>
    </PlayGlyph16>
  ));
