import React from 'react';
import { storiesOf } from '@storybook/react';
import SubtractGlyph16 from '../../../lib/subtract--glyph/16';

storiesOf('SubtractGlyph16', module)
  .add('default', () => <SubtractGlyph16 />)
  .add('with accessibility label', () => (
    <SubtractGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SubtractGlyph16 focusable>
      <title>Icon title</title>
    </SubtractGlyph16>
  ));
