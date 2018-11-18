import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelRight20 from '../../../es/open-panel--right/20.js';

storiesOf('OpenPanelRight20', module)
  .add('default', () => <OpenPanelRight20 />)
  .add('with accessibility label', () => (
    <OpenPanelRight20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelRight20 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelRight20>
  ));
