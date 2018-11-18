import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidRight24 from '../../../es/open-panel--solid--right/24.js';

storiesOf('OpenPanelSolidRight24', module)
  .add('default', () => <OpenPanelSolidRight24 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidRight24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidRight24 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidRight24>
  ));
