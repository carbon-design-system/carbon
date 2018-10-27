import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelLeft32 from '../../../lib/open-panel--left/32';

storiesOf('OpenPanelLeft32', module)
  .add('default', () => <OpenPanelLeft32 />)
  .add('with accessibility label', () => (
    <OpenPanelLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelLeft32 focusable>
      <title>Icon title</title>
    </OpenPanelLeft32>
  ));
