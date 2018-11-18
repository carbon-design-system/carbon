import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenPanelBottom20 from '../../../es/open-panel--bottom/20.js';

storiesOf('OpenPanelBottom20', module)
  .add('default', () => <OpenPanelBottom20 />)
  .add('with accessibility label', () => (
    <OpenPanelBottom20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <OpenPanelBottom20 aria-label="Icon label">
      <title>Icon title</title>
    </OpenPanelBottom20>
  ));
