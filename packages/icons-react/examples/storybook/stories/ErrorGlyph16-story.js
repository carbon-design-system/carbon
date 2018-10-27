import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorGlyph16 from '../../../lib/error--glyph/16';

storiesOf('ErrorGlyph16', module)
  .add('default', () => <ErrorGlyph16 />)
  .add('with accessibility label', () => (
    <ErrorGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ErrorGlyph16 focusable>
      <title>Icon title</title>
    </ErrorGlyph16>
  ));
