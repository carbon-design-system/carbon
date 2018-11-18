import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthHangingProtocol20 from '../../../es/watson-health/hanging-protocol/20.js';

storiesOf('WatsonHealthHangingProtocol20', module)
  .add('default', () => <WatsonHealthHangingProtocol20 />)
  .add('with accessibility label', () => (
    <WatsonHealthHangingProtocol20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthHangingProtocol20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealthHangingProtocol20>
  ));
