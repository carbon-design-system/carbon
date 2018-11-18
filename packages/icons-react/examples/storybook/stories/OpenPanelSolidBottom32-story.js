import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidBottom32 from '../../../es/open-panel--solid--bottom/32.js';

storiesOf('OpenPanelSolidBottom32', module)
  .add('default', () => <OpenPanelSolidBottom32 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidBottom32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidBottom32 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidBottom32>
  ));
