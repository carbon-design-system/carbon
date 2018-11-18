import React from 'react';
import { storiesOf } from '@storybook/react';
import WatsonHealth3rdPartyConnected20 from '../../../es/watson-health/3rd-party-connected/20.js';

storiesOf('WatsonHealth3rdPartyConnected20', module)
  .add('default', () => <WatsonHealth3rdPartyConnected20 />)
  .add('with accessibility label', () => (
    <WatsonHealth3rdPartyConnected20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <WatsonHealth3rdPartyConnected20 aria-label="Icon label">
      <title>Icon title</title>
    </WatsonHealth3rdPartyConnected20>
  ));
