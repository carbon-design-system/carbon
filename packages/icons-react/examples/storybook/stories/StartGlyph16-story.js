import React from 'react';
import { storiesOf } from '@storybook/react';
import StartGlyph16 from '../../../lib/StartGlyph/16';

storiesOf('StartGlyph16', module)
  .add('default', () => <StartGlyph16 />)
  .add('with accessibility label', () => (
    <StartGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <StartGlyph16 focusable>
      <title>Icon title</title>
    </StartGlyph16>
  ));
