import React from 'react';
import { storiesOf } from '@storybook/react';
import Bluetooth24 from '../../../es/bluetooth/24.js';

storiesOf('Bluetooth24', module)
  .add('default', () => <Bluetooth24 />)
  .add('with accessibility label', () => (
    <Bluetooth24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bluetooth24 aria-label="Icon label">
      <title>Icon title</title>
    </Bluetooth24>
  ));
