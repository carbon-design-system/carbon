import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelRight32 from '../../../es/open-panel--right/32.js';

storiesOf('OpenPanelRight32', module)
  .add('default', () => <OpenPanelRight32 />)
  .add('with accessibility label', () => (
    <OpenPanelRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelRight32 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelRight32>
  ));
