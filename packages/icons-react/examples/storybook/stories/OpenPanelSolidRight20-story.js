import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidRight20 from '../../../es/open-panel--solid--right/20.js';

storiesOf('OpenPanelSolidRight20', module)
  .add('default', () => <OpenPanelSolidRight20 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidRight20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidRight20 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidRight20>
  ));
