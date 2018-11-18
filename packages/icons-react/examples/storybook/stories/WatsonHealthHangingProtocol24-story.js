import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthHangingProtocol24 from '../../../es/watson-health/hanging-protocol/24.js';

storiesOf('WatsonHealthHangingProtocol24', module)
  .add('default', () => <WatsonHealthHangingProtocol24 />)
  .add('with accessibility label', () => (
    <WatsonHealthHangingProtocol24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthHangingProtocol24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthHangingProtocol24>
  ));
