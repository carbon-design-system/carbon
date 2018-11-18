import React from 'react';
import { storiesOf } from '@storybook/react';
import ColorPalette20 from '../../../es/color-palette/20.js';

storiesOf('ColorPalette20', module)
  .add('default', () => <ColorPalette20 />)
  .add('with accessibility label', () => (
    <ColorPalette20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ColorPalette20 aria-label="Icon label">
      <title>Icon title</title>
    </ColorPalette20>
  ));
