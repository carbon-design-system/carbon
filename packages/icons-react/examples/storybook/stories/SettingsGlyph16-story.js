import React from 'react';
import { storiesOf } from '@storybook/react';
import SettingsGlyph16 from '../../../lib/settings--glyph/16';

storiesOf('SettingsGlyph16', module)
  .add('default', () => <SettingsGlyph16 />)
  .add('with accessibility label', () => (
    <SettingsGlyph16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SettingsGlyph16 focusable>
      <title>Icon title</title>
    </SettingsGlyph16>
  ));
