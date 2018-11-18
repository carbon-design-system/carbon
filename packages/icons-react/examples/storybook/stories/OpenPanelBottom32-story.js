import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelBottom32 from '../../../es/open-panel--bottom/32.js';

storiesOf('OpenPanelBottom32', module)
  .add('default', () => <OpenPanelBottom32 />)
  .add('with accessibility label', () => (
    <OpenPanelBottom32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelBottom32 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelBottom32>
  ));
