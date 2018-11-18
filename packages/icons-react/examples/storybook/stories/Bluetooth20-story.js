import React from 'react';
import { storiesOf } from '@storybook/react';
import Bluetooth20 from '../../../es/bluetooth/20.js';

storiesOf('Bluetooth20', module)
  .add('default', () => <Bluetooth20 />)
  .add('with accessibility label', () => (
    <Bluetooth20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bluetooth20 aria-label="Icon label">
      <title>Icon title</title>
    </Bluetooth20>
  ));
