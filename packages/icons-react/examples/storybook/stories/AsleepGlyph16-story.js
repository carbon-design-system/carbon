import React from 'react';
import { storiesOf } from '@storybook/react';
import AsleepGlyph16 from '../../../lib/asleep--glyph/16';

storiesOf('AsleepGlyph16', module)
  .add('default', () => <AsleepGlyph16 />)
  .add('with accessibility label', () => (
    <AsleepGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AsleepGlyph16 focusable>
      <title>Icon title</title>
    </AsleepGlyph16>
  ));
