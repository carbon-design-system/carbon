import React from 'react';
import { storiesOf } from '@storybook/react';
import Vpn32 from '../../../lib/Vpn/32';

storiesOf('Vpn32', module)
  .add('default', () => <Vpn32 />)
  .add('with accessibility label', () => (
    <Vpn32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Vpn32 focusable>
      <title>Icon title</title>
    </Vpn32>
  ));
