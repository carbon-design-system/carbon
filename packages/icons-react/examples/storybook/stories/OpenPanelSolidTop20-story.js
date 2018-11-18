import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidTop20 from '../../../es/open-panel--solid--top/20.js';

storiesOf('OpenPanelSolidTop20', module)
  .add('default', () => <OpenPanelSolidTop20 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidTop20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidTop20 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidTop20>
  ));
