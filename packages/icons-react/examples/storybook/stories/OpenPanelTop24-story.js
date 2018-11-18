import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelTop24 from '../../../es/open-panel--top/24.js';

storiesOf('OpenPanelTop24', module)
  .add('default', () => <OpenPanelTop24 />)
  .add('with accessibility label', () => (
    <OpenPanelTop24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelTop24 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelTop24>
  ));
