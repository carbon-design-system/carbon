import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelTop20 from '../../../es/open-panel--top/20.js';

storiesOf('OpenPanelTop20', module)
  .add('default', () => <OpenPanelTop20 />)
  .add('with accessibility label', () => (
    <OpenPanelTop20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelTop20 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelTop20>
  ));
