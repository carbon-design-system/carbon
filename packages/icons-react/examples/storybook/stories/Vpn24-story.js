import React from 'react';
import { storiesOf } from '@storybook/react';
import Vpn24 from '../../../es/VPN/24.js';

storiesOf('Vpn24', module)
  .add('default', () => <Vpn24 />)
  .add('with accessibility label', () => (
    <Vpn24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Vpn24 aria-label="Icon label">
      <title>Icon title</title>
    </Vpn24>
  ));
