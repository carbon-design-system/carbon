import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthHangingProtocol32 from '../../../es/watson-health/hanging-protocol/32.js';

storiesOf('WatsonHealthHangingProtocol32', module)
  .add('default', () => <WatsonHealthHangingProtocol32 />)
  .add('with accessibility label', () => (
    <WatsonHealthHangingProtocol32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthHangingProtocol32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthHangingProtocol32>
  ));
