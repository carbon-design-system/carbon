import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelRight24 from '../../../es/open-panel--right/24.js';

storiesOf('OpenPanelRight24', module)
  .add('default', () => <OpenPanelRight24 />)
  .add('with accessibility label', () => (
    <OpenPanelRight24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelRight24 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelRight24>
  ));
