import React from 'react';
import { storiesOf } from '@storybook/react';
import WarningGlyph16 from '../../../lib/WarningGlyph/16';

storiesOf('WarningGlyph16', module)
  .add('default', () => <WarningGlyph16 />)
  .add('with accessibility label', () => (
    <WarningGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WarningGlyph16 focusable>
      <title>Icon title</title>
    </WarningGlyph16>
  ));
