import React from 'react';
import { storiesOf } from '@storybook/react';
import HelpGlyph16 from '../../../lib/help--glyph/16';

storiesOf('HelpGlyph16', module)
  .add('default', () => <HelpGlyph16 />)
  .add('with accessibility label', () => (
    <HelpGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HelpGlyph16 focusable>
      <title>Icon title</title>
    </HelpGlyph16>
  ));
