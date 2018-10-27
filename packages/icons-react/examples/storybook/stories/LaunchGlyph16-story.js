import React from 'react';
import { storiesOf } from '@storybook/react';
import LaunchGlyph16 from '../../../lib/launch--glyph/16';

storiesOf('LaunchGlyph16', module)
  .add('default', () => <LaunchGlyph16 />)
  .add('with accessibility label', () => (
    <LaunchGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <LaunchGlyph16 focusable>
      <title>Icon title</title>
    </LaunchGlyph16>
  ));
