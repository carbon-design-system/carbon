import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealthHangingProtocol32 from '../../../lib/WatsonHealthHangingProtocol/32';

storiesOf('WatsonHealthHangingProtocol32', module)
  .add('default', () => <WatsonHealthHangingProtocol32 />)
  .add('with accessibility label', () => (
    <WatsonHealthHangingProtocol32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealthHangingProtocol32 focusable>
      <title>Icon title</title>
    </WatsonHealthHangingProtocol32>
  ));
