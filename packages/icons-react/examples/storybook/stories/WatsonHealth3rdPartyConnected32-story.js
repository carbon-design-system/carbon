import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3rdPartyConnected32 from '../../../es/watson-health/3rd-party-connected/32.js';

storiesOf('WatsonHealth3rdPartyConnected32', module)
  .add('default', () => <WatsonHealth3rdPartyConnected32 />)
  .add('with accessibility label', () => (
    <WatsonHealth3rdPartyConnected32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3rdPartyConnected32 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3rdPartyConnected32>
  ));
