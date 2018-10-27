import React from 'react';
import { storiesOf } from '@storybook/react';
import InfoGlyph16 from '../../../lib/info--glyph/16';

storiesOf('InfoGlyph16', module)
  .add('default', () => <InfoGlyph16 />)
  .add('with accessibility label', () => (
    <InfoGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <InfoGlyph16 focusable>
      <title>Icon title</title>
    </InfoGlyph16>
  ));
