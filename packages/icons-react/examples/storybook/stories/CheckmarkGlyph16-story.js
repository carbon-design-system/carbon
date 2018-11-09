import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckmarkGlyph16 from '../../../lib/CheckmarkGlyph/16';

storiesOf('CheckmarkGlyph16', module)
  .add('default', () => <CheckmarkGlyph16 />)
  .add('with accessibility label', () => (
    <CheckmarkGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckmarkGlyph16 focusable>
      <title>Icon title</title>
    </CheckmarkGlyph16>
  ));
