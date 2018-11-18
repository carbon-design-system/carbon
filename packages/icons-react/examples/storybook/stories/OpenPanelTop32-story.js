import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelTop32 from '../../../es/open-panel--top/32.js';

storiesOf('OpenPanelTop32', module)
  .add('default', () => <OpenPanelTop32 />)
  .add('with accessibility label', () => (
    <OpenPanelTop32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelTop32 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelTop32>
  ));
