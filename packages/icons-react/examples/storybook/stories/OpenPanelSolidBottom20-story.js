import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelSolidBottom20 from '../../../es/open-panel--solid--bottom/20.js';

storiesOf('OpenPanelSolidBottom20', module)
  .add('default', () => <OpenPanelSolidBottom20 />)
  .add('with accessibility label', () => (
    <OpenPanelSolidBottom20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelSolidBottom20 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelSolidBottom20>
  ));
