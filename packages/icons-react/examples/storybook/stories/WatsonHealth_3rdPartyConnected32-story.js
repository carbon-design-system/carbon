import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth_3rdPartyConnected32 from '../../../lib/watson-health--3rd-party-connected/32';

storiesOf('WatsonHealth_3rdPartyConnected32', module)
  .add('default', () => <WatsonHealth_3rdPartyConnected32 />)
  .add('with accessibility label', () => (
    <WatsonHealth_3rdPartyConnected32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth_3rdPartyConnected32 focusable>
      <title>Icon title</title>
    </WatsonHealth_3rdPartyConnected32>
  ));
