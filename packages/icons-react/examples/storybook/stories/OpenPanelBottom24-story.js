import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelBottom24 from '../../../es/open-panel--bottom/24.js';

storiesOf('OpenPanelBottom24', module)
  .add('default', () => <OpenPanelBottom24 />)
  .add('with accessibility label', () => (
    <OpenPanelBottom24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelBottom24 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelBottom24>
  ));
