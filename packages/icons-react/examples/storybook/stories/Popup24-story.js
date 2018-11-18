import React from 'react';
import { storiesOf } from '@storybook/react';
import Popup24 from '../../../es/popup/24.js';

storiesOf('Popup24', module)
  .add('default', () => <Popup24 />)
  .add('with accessibility label', () => (
    <Popup24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Popup24 aria-label="Icon label">
      <title>Icon title</title>
    </Popup24>
  ));
