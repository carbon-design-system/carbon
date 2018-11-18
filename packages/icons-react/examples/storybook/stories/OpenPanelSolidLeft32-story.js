import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidLeft32 from '../../../es/open-panel--solid--left/32.js';

storiesOf('OpenPanelSolidLeft32', module)
  .add('default', () => <OpenPanelSolidLeft32 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidLeft32 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidLeft32>
  ));
