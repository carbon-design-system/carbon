import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidTop24 from '../../../es/open-panel--solid--top/24.js';

storiesOf('OpenPanelSolidTop24', module)
  .add('default', () => <OpenPanelSolidTop24 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidTop24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidTop24 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidTop24>
  ));
