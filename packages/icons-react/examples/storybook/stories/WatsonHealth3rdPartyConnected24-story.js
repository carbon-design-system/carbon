import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3rdPartyConnected24 from '../../../es/watson-health/3rd-party-connected/24.js';

storiesOf('WatsonHealth3rdPartyConnected24', module)
  .add('default', () => <WatsonHealth3rdPartyConnected24 />)
  .add('with accessibility label', () => (
    <WatsonHealth3rdPartyConnected24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3rdPartyConnected24 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3rdPartyConnected24>
  ));
