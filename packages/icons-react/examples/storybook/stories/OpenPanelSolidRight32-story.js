import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidRight32 from '../../../es/open-panel--solid--right/32.js';

storiesOf('OpenPanelSolidRight32', module)
  .add('default', () => <OpenPanelSolidRight32 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidRight32 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidRight32>
  ));
