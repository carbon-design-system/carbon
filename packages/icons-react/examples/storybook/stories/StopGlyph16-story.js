import React from 'react';
import { storiesOf } from '@storybook/react';
import StopGlyph16 from '../../../lib/stop--glyph/16';

storiesOf('StopGlyph16', module)
  .add('default', () => <StopGlyph16 />)
  .add('with accessibility label', () => (
    <StopGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StopGlyph16 focusable>
      <title>Icon title</title>
    </StopGlyph16>
  ));
