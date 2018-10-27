import React from 'react';
import { storiesOf } from '@storybook/react';
import Bluetooth32 from '../../../lib/bluetooth/32';

storiesOf('Bluetooth32', module)
  .add('default', () => <Bluetooth32 />)
  .add('with accessibility label', () => (
    <Bluetooth32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Bluetooth32 focusable>
      <title>Icon title</title>
    </Bluetooth32>
  ));
