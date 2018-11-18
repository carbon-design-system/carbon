import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidLeft20 from '../../../es/open-panel--solid--left/20.js';

storiesOf('OpenPanelSolidLeft20', module)
  .add('default', () => <OpenPanelSolidLeft20 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidLeft20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidLeft20 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidLeft20>
  ));
