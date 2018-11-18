import React from 'react';
import { storiesOf } from '@storybook/react';
import Vpn32 from '../../../es/VPN/32.js';

storiesOf('Vpn32', module)
  .add('default', () => <Vpn32 />)
  .add('with accessibility label', () => (
    <Vpn32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Vpn32 aria-label="Icon label">
      <title>Icon title</title>
    </Vpn32>
  ));
