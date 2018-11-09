import React from 'react';
import { storiesOf } from '@storybook/react';
import PowerGlyph16 from '../../../lib/PowerGlyph/16';

storiesOf('PowerGlyph16', module)
  .add('default', () => <PowerGlyph16 />)
  .add('with accessibility label', () => (
    <PowerGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PowerGlyph16 focusable>
      <title>Icon title</title>
    </PowerGlyph16>
  ));
