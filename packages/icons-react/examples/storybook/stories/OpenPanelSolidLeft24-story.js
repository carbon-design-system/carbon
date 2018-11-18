import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidLeft24 from '../../../es/open-panel--solid--left/24.js';

storiesOf('OpenPanelSolidLeft24', module)
  .add('default', () => <OpenPanelSolidLeft24 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidLeft24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidLeft24 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidLeft24>
  ));
