import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidBottom24 from '../../../es/open-panel--solid--bottom/24.js';

storiesOf('OpenPanelSolidBottom24', module)
  .add('default', () => <OpenPanelSolidBottom24 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidBottom24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidBottom24 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidBottom24>
  ));
