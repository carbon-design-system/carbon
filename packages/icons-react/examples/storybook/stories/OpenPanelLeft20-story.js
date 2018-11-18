import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelLeft20 from '../../../es/open-panel--left/20.js';

storiesOf('OpenPanelLeft20', module)
  .add('default', () => <OpenPanelLeft20 />)
  .add('with accessibility label', () => (
    <OpenPanelLeft20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelLeft20 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelLeft20>
  ));
