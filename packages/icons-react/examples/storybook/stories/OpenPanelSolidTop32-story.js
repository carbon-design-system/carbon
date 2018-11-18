import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidTop32 from '../../../es/open-panel--solid--top/32.js';

storiesOf('OpenPanelSolidTop32', module)
  .add('default', () => <OpenPanelSolidTop32 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidTop32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidTop32 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidTop32>
  ));
