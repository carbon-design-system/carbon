import React from 'react';
import { storiesOf } from '@storybook/react';
import Bluetooth32 from '../../../es/bluetooth/32.js';

storiesOf('Bluetooth32', module)
  .add('default', () => <Bluetooth32 />)
  .add('with accessibility label', () => (
    <Bluetooth32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bluetooth32 aria-label="Icon label">
      <title>Icon title</title>
    </Bluetooth32>
  ));
