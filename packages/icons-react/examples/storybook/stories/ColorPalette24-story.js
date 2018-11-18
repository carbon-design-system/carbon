import React from 'react';
import { storiesOf } from '@storybook/react';
import ColorPalette24 from '../../../es/color-palette/24.js';

storiesOf('ColorPalette24', module)
  .add('default', () => <ColorPalette24 />)
  .add('with accessibility label', () => (
    <ColorPalette24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ColorPalette24 aria-label="Icon label">
      <title>Icon title</title>
    </ColorPalette24>
  ));
