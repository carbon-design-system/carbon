import React from 'react';
import { storiesOf } from '@storybook/react';
import Vpn20 from '../../../es/VPN/20.js';

storiesOf('Vpn20', module)
  .add('default', () => <Vpn20 />)
  .add('with accessibility label', () => (
    <Vpn20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Vpn20 aria-label="Icon label">
      <title>Icon title</title>
    </Vpn20>
  ));
