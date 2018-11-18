import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelLeft24 from '../../../es/open-panel--left/24.js';

storiesOf('OpenPanelLeft24', module)
  .add('default', () => <OpenPanelLeft24 />)
  .add('with accessibility label', () => (
    <OpenPanelLeft24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelLeft24 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelLeft24>
  ));
