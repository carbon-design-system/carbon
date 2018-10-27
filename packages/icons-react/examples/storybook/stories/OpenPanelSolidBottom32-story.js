import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidBottom32 from '../../../lib/open-panel--solid--bottom/32';

storiesOf('OpenPanelSolidBottom32', module)
  .add('default', () => <OpenPanelSolidBottom32 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidBottom32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidBottom32 focusable>
      <title>Icon title</title>
    </OpenPanelSolidBottom32>
  ));
